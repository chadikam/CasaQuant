/**
 * Test the model inference with sample data
 */

import { predictHousePrice, initializePredictor } from '../utils/modelInference.js';

async function testModel() {
  console.log('🧪 Testing model inference...\n');
  
  try {
    // Initialize the predictor
    console.log('Initializing predictor...');
    await initializePredictor();
    console.log('✓ Predictor initialized\n');
    
    // Test case 1: Small apartment in Tunis
    console.log('Test 1: Small apartment in Tunis');
    const test1 = {
      category: 0,  // Apartment
      type: 0,      // For sale
      city: 22,     // Tunis
      region: 500,  // Example region
      room_count: 2,
      bathroom_count: 1,
      size: 80
    };
    
    const price1 = await predictHousePrice(test1);
    console.log(`Input: 2-room, 1-bath apartment, 80m² in Tunis`);
    console.log(`Predicted Price: ${price1.toLocaleString('en-TN', { 
      style: 'currency', 
      currency: 'TND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })}\n`);
    
    // Test case 2: Large villa in Sousse
    console.log('Test 2: Large villa in Sousse');
    const test2 = {
      category: 1,  // Villa
      type: 0,      // For sale
      city: 19,     // Sousse
      region: 400,  // Example region
      room_count: 5,
      bathroom_count: 3,
      size: 250
    };
    
    const price2 = await predictHousePrice(test2);
    console.log(`Input: 5-room, 3-bath villa, 250m² in Sousse`);
    console.log(`Predicted Price: ${price2.toLocaleString('en-TN', { 
      style: 'currency', 
      currency: 'TND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })}\n`);
    
    // Performance test
    console.log('Performance Test: 10 predictions');
    const start = performance.now();
    
    for (let i = 0; i < 10; i++) {
      await predictHousePrice(test1);
    }
    
    const end = performance.now();
    const avgTime = (end - start) / 10;
    console.log(`Average prediction time: ${avgTime.toFixed(2)}ms`);
    console.log(`Predictions per second: ${(1000 / avgTime).toFixed(0)}`);
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Export for use in other files
export default testModel;
