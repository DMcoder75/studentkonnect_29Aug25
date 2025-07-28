import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';

class ExportService {
  // Export SOP to PDF
  async exportToPDF(formData, filename = 'SOP_Statement_of_Purpose.pdf') {
    try {
      // Create a completely isolated iframe for rendering
      const iframe = document.createElement('iframe');
      iframe.style.position = 'fixed';
      iframe.style.top = '-10000px';
      iframe.style.left = '-10000px';
      iframe.style.width = '794px';
      iframe.style.height = '1123px'; // A4 height in pixels
      iframe.style.border = 'none';
      iframe.style.visibility = 'hidden';
      
      document.body.appendChild(iframe);
      
      // Wait for iframe to load
      await new Promise(resolve => {
        iframe.onload = resolve;
        iframe.src = 'about:blank';
      });

      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
      
      // Create completely isolated HTML with inline styles only
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
              color: rgb(0, 0, 0) !important;
              background-color: transparent !important;
            }
            body {
              font-family: Arial, sans-serif !important;
              font-size: 12px !important;
              line-height: 1.6 !important;
              color: rgb(0, 0, 0) !important;
              background-color: rgb(255, 255, 255) !important;
              padding: 40px !important;
              width: 794px !important;
              min-height: 1123px !important;
            }
            h1 {
              font-size: 28px !important;
              font-weight: bold !important;
              text-align: center !important;
              color: rgb(37, 99, 235) !important;
              margin-bottom: 30px !important;
            }
            h2 {
              font-size: 20px !important;
              font-weight: bold !important;
              color: rgb(31, 41, 55) !important;
              margin-bottom: 10px !important;
              padding-bottom: 5px !important;
              border-bottom: 2px solid rgb(229, 231, 235) !important;
            }
            p {
              margin: 5px 0 !important;
              color: rgb(0, 0, 0) !important;
              text-align: justify !important;
            }
            .section {
              margin-bottom: 25px !important;
            }
            .footer {
              margin-top: 40px !important;
              text-align: center !important;
              color: rgb(107, 114, 128) !important;
              font-size: 12px !important;
            }
            strong {
              font-weight: bold !important;
              color: rgb(0, 0, 0) !important;
            }
          </style>
        </head>
        <body>
          ${this.buildSOPContentPlain(formData)}
        </body>
        </html>
      `;

      iframeDoc.open();
      iframeDoc.write(htmlContent);
      iframeDoc.close();

      // Wait for content to render
      await new Promise(resolve => setTimeout(resolve, 500));

      // Convert iframe content to canvas
      const canvas = await html2canvas(iframeDoc.body, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: 794,
        height: iframeDoc.body.scrollHeight,
        windowWidth: 794,
        windowHeight: iframeDoc.body.scrollHeight
      });

      // Remove iframe
      document.body.removeChild(iframe);

      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add additional pages if needed
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Save the PDF
      pdf.save(filename);
      
      return { success: true, message: 'PDF exported successfully!' };
    } catch (error) {
      console.error('PDF export error:', error);
      return { success: false, message: 'Failed to export PDF: ' + error.message };
    }
  }

  // Build plain HTML content for PDF export (no external styles)
  buildSOPContentPlain(formData) {
    return `
      <h1>Statement of Purpose</h1>
      
      <div class="section">
        <h2>Personal Information</h2>
        <p><strong>Name:</strong> ${formData.personalInfo?.fullName || 'Not provided'}</p>
        <p><strong>Email:</strong> ${formData.personalInfo?.email || 'Not provided'}</p>
        <p><strong>Phone:</strong> ${formData.personalInfo?.phoneNumber || 'Not provided'}</p>
        <p><strong>Nationality:</strong> ${formData.personalInfo?.nationality || 'Not provided'}</p>
      </div>

      <div class="section">
        <h2>Application Details</h2>
        <p><strong>Purpose:</strong> ${formData.setup?.purpose || 'Not specified'}</p>
        <p><strong>Target University:</strong> ${formData.setup?.targetUniversity || 'Not specified'}</p>
        <p><strong>Target Course:</strong> ${formData.setup?.targetCourse || 'Not specified'}</p>
      </div>

      ${formData.introduction ? `
        <div class="section">
          <h2>Introduction</h2>
          <p>${formData.introduction}</p>
        </div>
      ` : ''}

      ${formData.academicBackground ? `
        <div class="section">
          <h2>Academic Background</h2>
          <p>${formData.academicBackground}</p>
        </div>
      ` : ''}

      ${formData.motivationAndInterest ? `
        <div class="section">
          <h2>Motivation and Interest</h2>
          <p>${formData.motivationAndInterest}</p>
        </div>
      ` : ''}

      ${formData.futureGoals ? `
        <div class="section">
          <h2>Future Goals</h2>
          <p>${formData.futureGoals}</p>
        </div>
      ` : ''}

      ${formData.whyThisUniversity ? `
        <div class="section">
          <h2>Why This University</h2>
          <p>${formData.whyThisUniversity}</p>
        </div>
      ` : ''}

      ${formData.conclusion ? `
        <div class="section">
          <h2>Conclusion</h2>
          <p>${formData.conclusion}</p>
        </div>
      ` : ''}

      <div class="footer">
        <p>Generated by Your Uni Pathway SOP Builder</p>
        <p>Date: ${new Date().toLocaleDateString()}</p>
      </div>
    `;
  }

  // Export SOP to Word document
  async exportToWord(formData, filename = 'SOP_Statement_of_Purpose.docx') {
    try {
      const doc = new Document({
        sections: [{
          properties: {},
          children: [
            // Title
            new Paragraph({
              children: [
                new TextRun({
                  text: "Statement of Purpose",
                  bold: true,
                  size: 32,
                  color: "2563EB"
                })
              ],
              heading: HeadingLevel.TITLE,
              alignment: AlignmentType.CENTER,
              spacing: { after: 400 }
            }),

            // Personal Information
            new Paragraph({
              children: [
                new TextRun({
                  text: "Personal Information",
                  bold: true,
                  size: 24,
                  color: "1F2937"
                })
              ],
              heading: HeadingLevel.HEADING_1,
              spacing: { before: 300, after: 200 }
            }),

            new Paragraph({
              children: [
                new TextRun({
                  text: `Name: ${formData.personalInfo?.fullName || 'Not provided'}\n`,
                  size: 22
                }),
                new TextRun({
                  text: `Email: ${formData.personalInfo?.email || 'Not provided'}\n`,
                  size: 22
                }),
                new TextRun({
                  text: `Phone: ${formData.personalInfo?.phoneNumber || 'Not provided'}\n`,
                  size: 22
                }),
                new TextRun({
                  text: `Nationality: ${formData.personalInfo?.nationality || 'Not provided'}`,
                  size: 22
                })
              ],
              spacing: { after: 300 }
            }),

            // Target Information
            new Paragraph({
              children: [
                new TextRun({
                  text: "Application Details",
                  bold: true,
                  size: 24,
                  color: "1F2937"
                })
              ],
              heading: HeadingLevel.HEADING_1,
              spacing: { before: 300, after: 200 }
            }),

            new Paragraph({
              children: [
                new TextRun({
                  text: `Purpose: ${formData.setup?.purpose || 'Not specified'}\n`,
                  size: 22
                }),
                new TextRun({
                  text: `Target University: ${formData.setup?.targetUniversity || 'Not specified'}\n`,
                  size: 22
                }),
                new TextRun({
                  text: `Target Course: ${formData.setup?.targetCourse || 'Not specified'}`,
                  size: 22
                })
              ],
              spacing: { after: 400 }
            }),

            // Introduction
            ...(formData.introduction ? [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Introduction",
                    bold: true,
                    size: 24,
                    color: "1F2937"
                  })
                ],
                heading: HeadingLevel.HEADING_1,
                spacing: { before: 300, after: 200 }
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: formData.introduction,
                    size: 22
                  })
                ],
                spacing: { after: 300 }
              })
            ] : []),

            // Academic Background
            ...(formData.academicBackground ? [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Academic Background",
                    bold: true,
                    size: 24,
                    color: "1F2937"
                  })
                ],
                heading: HeadingLevel.HEADING_1,
                spacing: { before: 300, after: 200 }
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: formData.academicBackground,
                    size: 22
                  })
                ],
                spacing: { after: 300 }
              })
            ] : []),

            // Motivation and Interest
            ...(formData.motivationAndInterest ? [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Motivation and Interest",
                    bold: true,
                    size: 24,
                    color: "1F2937"
                  })
                ],
                heading: HeadingLevel.HEADING_1,
                spacing: { before: 300, after: 200 }
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: formData.motivationAndInterest,
                    size: 22
                  })
                ],
                spacing: { after: 300 }
              })
            ] : []),

            // Future Goals
            ...(formData.futureGoals ? [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Future Goals",
                    bold: true,
                    size: 24,
                    color: "1F2937"
                  })
                ],
                heading: HeadingLevel.HEADING_1,
                spacing: { before: 300, after: 200 }
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: formData.futureGoals,
                    size: 22
                  })
                ],
                spacing: { after: 300 }
              })
            ] : []),

            // Why This University
            ...(formData.whyThisUniversity ? [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Why This University",
                    bold: true,
                    size: 24,
                    color: "1F2937"
                  })
                ],
                heading: HeadingLevel.HEADING_1,
                spacing: { before: 300, after: 200 }
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: formData.whyThisUniversity,
                    size: 22
                  })
                ],
                spacing: { after: 300 }
              })
            ] : []),

            // Conclusion
            ...(formData.conclusion ? [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Conclusion",
                    bold: true,
                    size: 24,
                    color: "1F2937"
                  })
                ],
                heading: HeadingLevel.HEADING_1,
                spacing: { before: 300, after: 200 }
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: formData.conclusion,
                    size: 22
                  })
                ],
                spacing: { after: 300 }
              })
            ] : [])
          ]
        }]
      });

      // Generate and save the document
      const blob = await Packer.toBlob(doc);
      saveAs(blob, filename);
      
      return { success: true, message: 'Word document exported successfully!' };
    } catch (error) {
      console.error('Word export error:', error);
      return { success: false, message: 'Failed to export Word document: ' + error.message };
    }
  }

  // Build HTML content for PDF export
  buildSOPContent(formData) {
    return `
      <div style="max-width: 100%; margin: 0 auto; font-family: Arial, sans-serif; color: rgb(0, 0, 0); background-color: rgb(255, 255, 255);">
        <h1 style="text-align: center; color: rgb(37, 99, 235); margin-bottom: 30px; font-size: 28px; font-weight: bold;">
          Statement of Purpose
        </h1>
        
        <div style="margin-bottom: 25px;">
          <h2 style="color: rgb(31, 41, 55); font-size: 20px; margin-bottom: 10px; border-bottom: 2px solid rgb(229, 231, 235); padding-bottom: 5px; font-weight: bold;">
            Personal Information
          </h2>
          <p style="margin: 5px 0; color: rgb(0, 0, 0);"><strong>Name:</strong> ${formData.personalInfo?.fullName || 'Not provided'}</p>
          <p style="margin: 5px 0; color: rgb(0, 0, 0);"><strong>Email:</strong> ${formData.personalInfo?.email || 'Not provided'}</p>
          <p style="margin: 5px 0; color: rgb(0, 0, 0);"><strong>Phone:</strong> ${formData.personalInfo?.phoneNumber || 'Not provided'}</p>
          <p style="margin: 5px 0; color: rgb(0, 0, 0);"><strong>Nationality:</strong> ${formData.personalInfo?.nationality || 'Not provided'}</p>
        </div>

        <div style="margin-bottom: 25px;">
          <h2 style="color: rgb(31, 41, 55); font-size: 20px; margin-bottom: 10px; border-bottom: 2px solid rgb(229, 231, 235); padding-bottom: 5px; font-weight: bold;">
            Application Details
          </h2>
          <p style="margin: 5px 0; color: rgb(0, 0, 0);"><strong>Purpose:</strong> ${formData.setup?.purpose || 'Not specified'}</p>
          <p style="margin: 5px 0; color: rgb(0, 0, 0);"><strong>Target University:</strong> ${formData.setup?.targetUniversity || 'Not specified'}</p>
          <p style="margin: 5px 0; color: rgb(0, 0, 0);"><strong>Target Course:</strong> ${formData.setup?.targetCourse || 'Not specified'}</p>
        </div>

        ${formData.introduction ? `
          <div style="margin-bottom: 25px;">
            <h2 style="color: rgb(31, 41, 55); font-size: 20px; margin-bottom: 10px; border-bottom: 2px solid rgb(229, 231, 235); padding-bottom: 5px; font-weight: bold;">
              Introduction
            </h2>
            <p style="text-align: justify; line-height: 1.6; color: rgb(0, 0, 0);">${formData.introduction}</p>
          </div>
        ` : ''}

        ${formData.academicBackground ? `
          <div style="margin-bottom: 25px;">
            <h2 style="color: rgb(31, 41, 55); font-size: 20px; margin-bottom: 10px; border-bottom: 2px solid rgb(229, 231, 235); padding-bottom: 5px; font-weight: bold;">
              Academic Background
            </h2>
            <p style="text-align: justify; line-height: 1.6; color: rgb(0, 0, 0);">${formData.academicBackground}</p>
          </div>
        ` : ''}

        ${formData.motivationAndInterest ? `
          <div style="margin-bottom: 25px;">
            <h2 style="color: rgb(31, 41, 55); font-size: 20px; margin-bottom: 10px; border-bottom: 2px solid rgb(229, 231, 235); padding-bottom: 5px; font-weight: bold;">
              Motivation and Interest
            </h2>
            <p style="text-align: justify; line-height: 1.6; color: rgb(0, 0, 0);">${formData.motivationAndInterest}</p>
          </div>
        ` : ''}

        ${formData.futureGoals ? `
          <div style="margin-bottom: 25px;">
            <h2 style="color: rgb(31, 41, 55); font-size: 20px; margin-bottom: 10px; border-bottom: 2px solid rgb(229, 231, 235); padding-bottom: 5px; font-weight: bold;">
              Future Goals
            </h2>
            <p style="text-align: justify; line-height: 1.6; color: rgb(0, 0, 0);">${formData.futureGoals}</p>
          </div>
        ` : ''}

        ${formData.whyThisUniversity ? `
          <div style="margin-bottom: 25px;">
            <h2 style="color: rgb(31, 41, 55); font-size: 20px; margin-bottom: 10px; border-bottom: 2px solid rgb(229, 231, 235); padding-bottom: 5px; font-weight: bold;">
              Why This University
            </h2>
            <p style="text-align: justify; line-height: 1.6; color: rgb(0, 0, 0);">${formData.whyThisUniversity}</p>
          </div>
        ` : ''}

        ${formData.conclusion ? `
          <div style="margin-bottom: 25px;">
            <h2 style="color: rgb(31, 41, 55); font-size: 20px; margin-bottom: 10px; border-bottom: 2px solid rgb(229, 231, 235); padding-bottom: 5px; font-weight: bold;">
              Conclusion
            </h2>
            <p style="text-align: justify; line-height: 1.6; color: rgb(0, 0, 0);">${formData.conclusion}</p>
          </div>
        ` : ''}

        <div style="margin-top: 40px; text-align: center; color: rgb(107, 114, 128); font-size: 12px;">
          <p>Generated by Your Uni Pathway SOP Builder</p>
          <p>Date: ${new Date().toLocaleDateString()}</p>
        </div>
      </div>
    `;
  }

  // Export as plain text
  exportToText(formData, filename = 'SOP_Statement_of_Purpose.txt') {
    try {
      let content = "STATEMENT OF PURPOSE\n";
      content += "=".repeat(50) + "\n\n";
      
      content += "PERSONAL INFORMATION\n";
      content += "-".repeat(20) + "\n";
      content += `Name: ${formData.personalInfo?.fullName || 'Not provided'}\n`;
      content += `Email: ${formData.personalInfo?.email || 'Not provided'}\n`;
      content += `Phone: ${formData.personalInfo?.phoneNumber || 'Not provided'}\n`;
      content += `Nationality: ${formData.personalInfo?.nationality || 'Not provided'}\n\n`;
      
      content += "APPLICATION DETAILS\n";
      content += "-".repeat(20) + "\n";
      content += `Purpose: ${formData.setup?.purpose || 'Not specified'}\n`;
      content += `Target University: ${formData.setup?.targetUniversity || 'Not specified'}\n`;
      content += `Target Course: ${formData.setup?.targetCourse || 'Not specified'}\n\n`;

      if (formData.introduction) {
        content += "INTRODUCTION\n";
        content += "-".repeat(12) + "\n";
        content += formData.introduction + "\n\n";
      }

      if (formData.academicBackground) {
        content += "ACADEMIC BACKGROUND\n";
        content += "-".repeat(19) + "\n";
        content += formData.academicBackground + "\n\n";
      }

      if (formData.motivationAndInterest) {
        content += "MOTIVATION AND INTEREST\n";
        content += "-".repeat(23) + "\n";
        content += formData.motivationAndInterest + "\n\n";
      }

      if (formData.futureGoals) {
        content += "FUTURE GOALS\n";
        content += "-".repeat(12) + "\n";
        content += formData.futureGoals + "\n\n";
      }

      if (formData.whyThisUniversity) {
        content += "WHY THIS UNIVERSITY\n";
        content += "-".repeat(19) + "\n";
        content += formData.whyThisUniversity + "\n\n";
      }

      if (formData.conclusion) {
        content += "CONCLUSION\n";
        content += "-".repeat(10) + "\n";
        content += formData.conclusion + "\n\n";
      }

      content += `\nGenerated by Your Uni Pathway SOP Builder\n`;
      content += `Date: ${new Date().toLocaleDateString()}\n`;

      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      saveAs(blob, filename);
      
      return { success: true, message: 'Text file exported successfully!' };
    } catch (error) {
      console.error('Text export error:', error);
      return { success: false, message: 'Failed to export text file: ' + error.message };
    }
  }

  // Export Resume to PDF
  async exportResumeToPDF(formData, filename = 'Resume.pdf') {
    try {
      // Create a completely isolated iframe for rendering
      const iframe = document.createElement('iframe');
      iframe.style.position = 'fixed';
      iframe.style.top = '-10000px';
      iframe.style.left = '-10000px';
      iframe.style.width = '794px';
      iframe.style.height = '1123px'; // A4 height in pixels
      iframe.style.border = 'none';
      iframe.style.visibility = 'hidden';
      
      document.body.appendChild(iframe);
      
      // Wait for iframe to load
      await new Promise(resolve => {
        iframe.onload = resolve;
        iframe.src = 'about:blank';
      });

      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
      
      // Create completely isolated HTML with inline styles only
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
              color: rgb(0, 0, 0) !important;
              background-color: transparent !important;
            }
            body {
              font-family: Arial, sans-serif !important;
              font-size: 12px !important;
              line-height: 1.4 !important;
              color: rgb(0, 0, 0) !important;
              background-color: rgb(255, 255, 255) !important;
              padding: 30px !important;
              max-width: 794px !important;
            }
            .header {
              text-align: center !important;
              margin-bottom: 20px !important;
              border-bottom: 2px solid rgb(37, 99, 235) !important;
              padding-bottom: 15px !important;
            }
            .name {
              font-size: 24px !important;
              font-weight: bold !important;
              color: rgb(37, 99, 235) !important;
              margin-bottom: 5px !important;
            }
            .contact {
              font-size: 11px !important;
              color: rgb(75, 85, 99) !important;
              margin-bottom: 3px !important;
            }
            .section {
              margin-bottom: 20px !important;
            }
            .section-title {
              font-size: 16px !important;
              font-weight: bold !important;
              color: rgb(37, 99, 235) !important;
              border-bottom: 1px solid rgb(229, 231, 235) !important;
              padding-bottom: 5px !important;
              margin-bottom: 10px !important;
            }
            .entry {
              margin-bottom: 12px !important;
            }
            .entry-header {
              font-weight: bold !important;
              color: rgb(31, 41, 55) !important;
              margin-bottom: 2px !important;
            }
            .entry-subheader {
              font-style: italic !important;
              color: rgb(75, 85, 99) !important;
              margin-bottom: 3px !important;
            }
            .entry-date {
              font-size: 10px !important;
              color: rgb(107, 114, 128) !important;
              margin-bottom: 5px !important;
            }
            .entry-description {
              font-size: 11px !important;
              color: rgb(55, 65, 81) !important;
              margin-bottom: 3px !important;
            }
            .skills-container {
              display: flex !important;
              flex-wrap: wrap !important;
              gap: 8px !important;
            }
            .skill-tag {
              background-color: rgb(239, 246, 255) !important;
              color: rgb(37, 99, 235) !important;
              padding: 3px 8px !important;
              border-radius: 12px !important;
              font-size: 10px !important;
              border: 1px solid rgb(191, 219, 254) !important;
            }
            .summary {
              font-style: italic !important;
              color: rgb(75, 85, 99) !important;
              margin-bottom: 15px !important;
              padding: 10px !important;
              background-color: rgb(249, 250, 251) !important;
              border-left: 3px solid rgb(37, 99, 235) !important;
            }
          </style>
        </head>
        <body>
          ${this.buildResumeContent(formData)}
        </body>
        </html>
      `;

      iframeDoc.open();
      iframeDoc.write(htmlContent);
      iframeDoc.close();

      // Wait for content to render
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Import jsPDF dynamically
      const { jsPDF } = await import('jspdf');
      
      // Capture the iframe content
      const canvas = await html2canvas(iframe.contentDocument.body, {
        width: 794,
        height: 1123,
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });

      // Clean up iframe
      document.body.removeChild(iframe);

      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      
      // Calculate dimensions to fit A4
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      // Add additional pages if needed
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      // Save the PDF
      pdf.save(filename);
      
      return { success: true, message: 'Resume exported to PDF successfully!' };
    } catch (error) {
      console.error('PDF export error:', error);
      return { success: false, message: `Failed to export PDF: ${error.message}` };
    }
  }

  // Export Resume to Word
  async exportResumeToWord(formData, filename = 'Resume.docx') {
    try {
      const doc = new Document({
        sections: [{
          properties: {},
          children: this.buildResumeWordContent(formData)
        }]
      });

      const blob = await Packer.toBlob(doc);
      saveAs(blob, filename);
      
      return { success: true, message: 'Resume exported to Word successfully!' };
    } catch (error) {
      console.error('Word export error:', error);
      return { success: false, message: `Failed to export Word document: ${error.message}` };
    }
  }

  // Export Resume to Text
  async exportResumeToText(formData, filename = 'Resume.txt') {
    try {
      const content = this.buildResumeTextContent(formData);
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      saveAs(blob, filename);
      
      return { success: true, message: 'Resume exported to text successfully!' };
    } catch (error) {
      console.error('Text export error:', error);
      return { success: false, message: `Failed to export text file: ${error.message}` };
    }
  }

  // Main resume export method
  async exportResume(formData, format = 'pdf') {
    const timestamp = new Date().toISOString().split('T')[0];
    const baseName = `${formData.personalInfo.fullName || 'Resume'}_${timestamp}`;
    
    switch (format.toLowerCase()) {
      case 'pdf':
        return await this.exportResumeToPDF(formData, `${baseName}.pdf`);
      case 'word':
      case 'docx':
        return await this.exportResumeToWord(formData, `${baseName}.docx`);
      case 'text':
      case 'txt':
        return await this.exportResumeToText(formData, `${baseName}.txt`);
      default:
        return { success: false, message: 'Unsupported export format' };
    }
  }

  // Build resume content for PDF/HTML
  buildResumeContent(formData) {
    const { personalInfo, education, experience, skills, projects, activities, awards, references } = formData;
    
    let content = `
      <div class="header">
        <div class="name">${personalInfo.fullName || 'Your Name'}</div>
        <div class="contact">${personalInfo.email || 'your.email@example.com'}</div>
        <div class="contact">${personalInfo.phone || 'Your Phone Number'}</div>
        ${personalInfo.linkedinUrl ? `<div class="contact">${personalInfo.linkedinUrl}</div>` : ''}
        ${personalInfo.portfolioUrl ? `<div class="contact">${personalInfo.portfolioUrl}</div>` : ''}
        ${personalInfo.address ? `<div class="contact">${personalInfo.address}${personalInfo.city ? `, ${personalInfo.city}` : ''}${personalInfo.state ? `, ${personalInfo.state}` : ''}</div>` : ''}
      </div>
    `;

    // Professional Summary
    if (personalInfo.professionalSummary) {
      content += `
        <div class="section">
          <div class="section-title">Professional Summary</div>
          <div class="summary">${personalInfo.professionalSummary}</div>
        </div>
      `;
    }

    // Education
    if (education && education.length > 0) {
      content += `<div class="section"><div class="section-title">Education</div>`;
      education.forEach(edu => {
        content += `
          <div class="entry">
            <div class="entry-header">${edu.degreeType || 'Degree'} ${edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ''}</div>
            <div class="entry-subheader">${edu.institutionName || 'Institution'}</div>
            <div class="entry-date">${edu.startDate || ''} - ${edu.isCurrent ? 'Present' : (edu.endDate || '')}</div>
            ${edu.gpa ? `<div class="entry-description">GPA: ${edu.gpa}</div>` : ''}
            ${edu.achievements ? `<div class="entry-description">${edu.achievements}</div>` : ''}
            ${edu.location ? `<div class="entry-description">${edu.location}</div>` : ''}
          </div>
        `;
      });
      content += `</div>`;
    }

    // Work Experience
    if (experience && experience.length > 0) {
      content += `<div class="section"><div class="section-title">Work Experience</div>`;
      experience.forEach(exp => {
        content += `
          <div class="entry">
            <div class="entry-header">${exp.jobTitle || 'Job Title'}</div>
            <div class="entry-subheader">${exp.companyName || 'Company'} ${exp.location ? `- ${exp.location}` : ''}</div>
            <div class="entry-date">${exp.startDate || ''} - ${exp.isCurrent ? 'Present' : (exp.endDate || '')}</div>
            ${exp.description ? `<div class="entry-description">${exp.description}</div>` : ''}
            ${exp.achievements ? `<div class="entry-description">${exp.achievements}</div>` : ''}
          </div>
        `;
      });
      content += `</div>`;
    }

    // Skills
    const hasSkills = skills && Object.values(skills).some(skillArray => skillArray && skillArray.length > 0);
    if (hasSkills) {
      content += `<div class="section"><div class="section-title">Skills</div>`;
      Object.entries(skills).forEach(([category, skillList]) => {
        if (skillList && skillList.length > 0) {
          content += `
            <div class="entry">
              <div class="entry-header">${category.charAt(0).toUpperCase() + category.slice(1)} Skills</div>
              <div class="skills-container">
                ${skillList.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
              </div>
            </div>
          `;
        }
      });
      content += `</div>`;
    }

    // Projects
    if (projects && projects.length > 0) {
      content += `<div class="section"><div class="section-title">Projects</div>`;
      projects.forEach(project => {
        content += `
          <div class="entry">
            <div class="entry-header">${project.projectName || 'Project Name'}</div>
            <div class="entry-date">${project.startDate || ''} - ${project.isOngoing ? 'Ongoing' : (project.endDate || '')}</div>
            ${project.description ? `<div class="entry-description">${project.description}</div>` : ''}
            ${project.technologiesUsed ? `<div class="entry-description"><strong>Technologies:</strong> ${project.technologiesUsed}</div>` : ''}
            ${project.projectUrl ? `<div class="entry-description"><strong>URL:</strong> ${project.projectUrl}</div>` : ''}
          </div>
        `;
      });
      content += `</div>`;
    }

    // Activities
    if (activities && activities.length > 0) {
      content += `<div class="section"><div class="section-title">Activities & Volunteering</div>`;
      activities.forEach(activity => {
        content += `
          <div class="entry">
            <div class="entry-header">${activity.activityName || 'Activity'}</div>
            <div class="entry-subheader">${activity.organization || ''} ${activity.role ? `- ${activity.role}` : ''}</div>
            <div class="entry-date">${activity.startDate || ''} - ${activity.isOngoing ? 'Ongoing' : (activity.endDate || '')}</div>
            ${activity.description ? `<div class="entry-description">${activity.description}</div>` : ''}
          </div>
        `;
      });
      content += `</div>`;
    }

    // Awards
    if (awards && awards.length > 0) {
      content += `<div class="section"><div class="section-title">Awards & Certifications</div>`;
      awards.forEach(award => {
        content += `
          <div class="entry">
            <div class="entry-header">${award.awardName || 'Award'}</div>
            <div class="entry-subheader">${award.issuingOrganization || ''}</div>
            <div class="entry-date">${award.dateReceived || ''}</div>
            ${award.description ? `<div class="entry-description">${award.description}</div>` : ''}
            ${award.credentialId ? `<div class="entry-description"><strong>Credential ID:</strong> ${award.credentialId}</div>` : ''}
          </div>
        `;
      });
      content += `</div>`;
    }

    // References
    if (references && references.includeReferences && references.referenceList && references.referenceList.length > 0) {
      content += `<div class="section"><div class="section-title">References</div>`;
      references.referenceList.forEach(ref => {
        content += `
          <div class="entry">
            <div class="entry-header">${ref.referenceName || 'Reference Name'}</div>
            <div class="entry-subheader">${ref.jobTitle || ''} ${ref.company ? `at ${ref.company}` : ''}</div>
            ${ref.email ? `<div class="entry-description">Email: ${ref.email}</div>` : ''}
            ${ref.phone ? `<div class="entry-description">Phone: ${ref.phone}</div>` : ''}
          </div>
        `;
      });
      content += `</div>`;
    } else if (references && references.availableOnRequest) {
      content += `
        <div class="section">
          <div class="section-title">References</div>
          <div class="entry-description">Available upon request</div>
        </div>
      `;
    }

    return content;
  }

  // Build resume content for Word document
  buildResumeWordContent(formData) {
    const { personalInfo, education, experience, skills, projects, activities, awards, references } = formData;
    const content = [];

    // Header
    content.push(
      new Paragraph({
        children: [
          new TextRun({
            text: personalInfo.fullName || 'Your Name',
            bold: true,
            size: 32,
            color: '2563EB'
          })
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 }
      })
    );

    // Contact Information
    const contactInfo = [
      personalInfo.email,
      personalInfo.phone,
      personalInfo.linkedinUrl,
      personalInfo.portfolioUrl
    ].filter(Boolean).join(' | ');

    if (contactInfo) {
      content.push(
        new Paragraph({
          children: [new TextRun({ text: contactInfo, size: 20 })],
          alignment: AlignmentType.CENTER,
          spacing: { after: 300 }
        })
      );
    }

    // Professional Summary
    if (personalInfo.professionalSummary) {
      content.push(
        new Paragraph({
          children: [new TextRun({ text: 'PROFESSIONAL SUMMARY', bold: true, size: 24 })],
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 }
        }),
        new Paragraph({
          children: [new TextRun({ text: personalInfo.professionalSummary, size: 22 })],
          spacing: { after: 300 }
        })
      );
    }

    // Education
    if (education && education.length > 0) {
      content.push(
        new Paragraph({
          children: [new TextRun({ text: 'EDUCATION', bold: true, size: 24 })],
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 }
        })
      );

      education.forEach(edu => {
        content.push(
          new Paragraph({
            children: [
              new TextRun({ text: `${edu.degreeType || 'Degree'} ${edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ''}`, bold: true, size: 22 })
            ],
            spacing: { after: 50 }
          }),
          new Paragraph({
            children: [
              new TextRun({ text: edu.institutionName || 'Institution', italics: true, size: 20 })
            ],
            spacing: { after: 50 }
          }),
          new Paragraph({
            children: [
              new TextRun({ text: `${edu.startDate || ''} - ${edu.isCurrent ? 'Present' : (edu.endDate || '')}`, size: 20 })
            ],
            spacing: { after: 200 }
          })
        );
      });
    }

    // Work Experience
    if (experience && experience.length > 0) {
      content.push(
        new Paragraph({
          children: [new TextRun({ text: 'WORK EXPERIENCE', bold: true, size: 24 })],
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 }
        })
      );

      experience.forEach(exp => {
        content.push(
          new Paragraph({
            children: [
              new TextRun({ text: exp.jobTitle || 'Job Title', bold: true, size: 22 })
            ],
            spacing: { after: 50 }
          }),
          new Paragraph({
            children: [
              new TextRun({ text: `${exp.companyName || 'Company'} ${exp.location ? `- ${exp.location}` : ''}`, italics: true, size: 20 })
            ],
            spacing: { after: 50 }
          }),
          new Paragraph({
            children: [
              new TextRun({ text: `${exp.startDate || ''} - ${exp.isCurrent ? 'Present' : (exp.endDate || '')}`, size: 20 })
            ],
            spacing: { after: 100 }
          })
        );

        if (exp.description) {
          content.push(
            new Paragraph({
              children: [new TextRun({ text: exp.description, size: 20 })],
              spacing: { after: 200 }
            })
          );
        }
      });
    }

    // Skills
    const hasSkills = skills && Object.values(skills).some(skillArray => skillArray && skillArray.length > 0);
    if (hasSkills) {
      content.push(
        new Paragraph({
          children: [new TextRun({ text: 'SKILLS', bold: true, size: 24 })],
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 }
        })
      );

      Object.entries(skills).forEach(([category, skillList]) => {
        if (skillList && skillList.length > 0) {
          content.push(
            new Paragraph({
              children: [
                new TextRun({ text: `${category.charAt(0).toUpperCase() + category.slice(1)}: `, bold: true, size: 20 }),
                new TextRun({ text: skillList.join(', '), size: 20 })
              ],
              spacing: { after: 100 }
            })
          );
        }
      });
    }

    return content;
  }

  // Build resume content for text export
  buildResumeTextContent(formData) {
    const { personalInfo, education, experience, skills, projects, activities, awards, references } = formData;
    let content = '';

    // Header
    content += `${personalInfo.fullName || 'Your Name'}\n`;
    content += `${personalInfo.email || 'your.email@example.com'}\n`;
    content += `${personalInfo.phone || 'Your Phone Number'}\n`;
    if (personalInfo.linkedinUrl) content += `${personalInfo.linkedinUrl}\n`;
    if (personalInfo.portfolioUrl) content += `${personalInfo.portfolioUrl}\n`;
    if (personalInfo.address) {
      content += `${personalInfo.address}`;
      if (personalInfo.city) content += `, ${personalInfo.city}`;
      if (personalInfo.state) content += `, ${personalInfo.state}`;
      content += '\n';
    }
    content += '\n';

    // Professional Summary
    if (personalInfo.professionalSummary) {
      content += 'PROFESSIONAL SUMMARY\n';
      content += '===================\n';
      content += `${personalInfo.professionalSummary}\n\n`;
    }

    // Education
    if (education && education.length > 0) {
      content += 'EDUCATION\n';
      content += '=========\n';
      education.forEach(edu => {
        content += `${edu.degreeType || 'Degree'} ${edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ''}\n`;
        content += `${edu.institutionName || 'Institution'}\n`;
        content += `${edu.startDate || ''} - ${edu.isCurrent ? 'Present' : (edu.endDate || '')}\n`;
        if (edu.gpa) content += `GPA: ${edu.gpa}\n`;
        if (edu.achievements) content += `${edu.achievements}\n`;
        content += '\n';
      });
    }

    // Work Experience
    if (experience && experience.length > 0) {
      content += 'WORK EXPERIENCE\n';
      content += '===============\n';
      experience.forEach(exp => {
        content += `${exp.jobTitle || 'Job Title'}\n`;
        content += `${exp.companyName || 'Company'} ${exp.location ? `- ${exp.location}` : ''}\n`;
        content += `${exp.startDate || ''} - ${exp.isCurrent ? 'Present' : (exp.endDate || '')}\n`;
        if (exp.description) content += `${exp.description}\n`;
        if (exp.achievements) content += `${exp.achievements}\n`;
        content += '\n';
      });
    }

    // Skills
    const hasSkills = skills && Object.values(skills).some(skillArray => skillArray && skillArray.length > 0);
    if (hasSkills) {
      content += 'SKILLS\n';
      content += '======\n';
      Object.entries(skills).forEach(([category, skillList]) => {
        if (skillList && skillList.length > 0) {
          content += `${category.charAt(0).toUpperCase() + category.slice(1)}: ${skillList.join(', ')}\n`;
        }
      });
      content += '\n';
    }

    // Projects
    if (projects && projects.length > 0) {
      content += 'PROJECTS\n';
      content += '========\n';
      projects.forEach(project => {
        content += `${project.projectName || 'Project Name'}\n`;
        content += `${project.startDate || ''} - ${project.isOngoing ? 'Ongoing' : (project.endDate || '')}\n`;
        if (project.description) content += `${project.description}\n`;
        if (project.technologiesUsed) content += `Technologies: ${project.technologiesUsed}\n`;
        if (project.projectUrl) content += `URL: ${project.projectUrl}\n`;
        content += '\n';
      });
    }

    // Activities
    if (activities && activities.length > 0) {
      content += 'ACTIVITIES & VOLUNTEERING\n';
      content += '========================\n';
      activities.forEach(activity => {
        content += `${activity.activityName || 'Activity'}\n`;
        content += `${activity.organization || ''} ${activity.role ? `- ${activity.role}` : ''}\n`;
        content += `${activity.startDate || ''} - ${activity.isOngoing ? 'Ongoing' : (activity.endDate || '')}\n`;
        if (activity.description) content += `${activity.description}\n`;
        content += '\n';
      });
    }

    // Awards
    if (awards && awards.length > 0) {
      content += 'AWARDS & CERTIFICATIONS\n';
      content += '======================\n';
      awards.forEach(award => {
        content += `${award.awardName || 'Award'}\n`;
        content += `${award.issuingOrganization || ''}\n`;
        content += `${award.dateReceived || ''}\n`;
        if (award.description) content += `${award.description}\n`;
        if (award.credentialId) content += `Credential ID: ${award.credentialId}\n`;
        content += '\n';
      });
    }

    // References
    if (references && references.includeReferences && references.referenceList && references.referenceList.length > 0) {
      content += 'REFERENCES\n';
      content += '==========\n';
      references.referenceList.forEach(ref => {
        content += `${ref.referenceName || 'Reference Name'}\n`;
        content += `${ref.jobTitle || ''} ${ref.company ? `at ${ref.company}` : ''}\n`;
        if (ref.email) content += `Email: ${ref.email}\n`;
        if (ref.phone) content += `Phone: ${ref.phone}\n`;
        content += '\n';
      });
    } else if (references && references.availableOnRequest) {
      content += 'REFERENCES\n';
      content += '==========\n';
      content += 'Available upon request\n\n';
    }

    return content;
  }
}


// Export a singleton instance
const exportService = new ExportService()
export default exportService

