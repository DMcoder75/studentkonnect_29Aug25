// Script to check pathway data for "Accounting and Business" vs "Business and Accounting"
import { dbHelpers } from './src/lib/supabase.js'

async function checkPathwayData() {
  try {
    console.log('Fetching all pathways...')
    const pathways = await dbHelpers.getPathways()
    
    console.log(`Total pathways found: ${pathways.length}`)
    
    // Look for pathways containing "accounting" and "business"
    const accountingBusinessPathways = pathways.filter(pathway => {
      const name = pathway.name.toLowerCase()
      return name.includes('accounting') && name.includes('business')
    })
    
    console.log('\nPathways containing both "accounting" and "business":')
    accountingBusinessPathways.forEach(pathway => {
      console.log(`- ID: ${pathway.id}, Name: "${pathway.name}"`)
      console.log(`  Description: ${pathway.description?.substring(0, 100)}...`)
      console.log('')
    })
    
    // Check for exact matches
    const exactMatches = {
      'accounting_and_business': pathways.find(p => p.name.toLowerCase() === 'accounting and business'),
      'business_and_accounting': pathways.find(p => p.name.toLowerCase() === 'business and accounting')
    }
    
    console.log('Exact matches:')
    console.log('- "Accounting and Business":', exactMatches.accounting_and_business ? 'FOUND' : 'NOT FOUND')
    console.log('- "Business and Accounting":', exactMatches.business_and_accounting ? 'FOUND' : 'NOT FOUND')
    
    if (exactMatches.accounting_and_business) {
      console.log('\n"Accounting and Business" details:')
      console.log(`  ID: ${exactMatches.accounting_and_business.id}`)
      console.log(`  Name: ${exactMatches.accounting_and_business.name}`)
      console.log(`  Description: ${exactMatches.accounting_and_business.description}`)
    }
    
    if (exactMatches.business_and_accounting) {
      console.log('\n"Business and Accounting" details:')
      console.log(`  ID: ${exactMatches.business_and_accounting.id}`)
      console.log(`  Name: ${exactMatches.business_and_accounting.name}`)
      console.log(`  Description: ${exactMatches.business_and_accounting.description}`)
    }
    
    // Check for similar pathways
    const similarPathways = pathways.filter(pathway => {
      const name = pathway.name.toLowerCase()
      return (name.includes('accounting') || name.includes('business')) && 
             !accountingBusinessPathways.includes(pathway)
    })
    
    console.log('\nOther accounting or business related pathways:')
    similarPathways.forEach(pathway => {
      console.log(`- ID: ${pathway.id}, Name: "${pathway.name}"`)
    })
    
  } catch (error) {
    console.error('Error fetching pathway data:', error)
  }
}

checkPathwayData()

