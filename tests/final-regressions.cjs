const assert=require('assert/strict');
const {load}=require('./site-engine-harness.cjs');
let cases=0,assertions=0;
function check(name,inputs,expected){const p=load(name+'.html',inputs);p.click();for(const [id,value] of Object.entries(expected)){assert.equal(p.out(id),value,name+' '+id);assertions++;}cases++;return p;}
// A zero-interest $60,000 car is sold after 12 of 60 payments for $45,000.
// The $48,000 remaining loan must be paid: the economic cost is $15,000.
check('total-cost-car-ownership',{purchasePrice:60000,downPayment:0,tradeCredit:0,annualRate:0,loanMonths:60,ownershipYears:1,annualMiles:0,mpg:30,fuelPrice:0,annualInsurance:0,maintenancePerMile:0,annualRegistration:0,resaleValue:45000},{mainResult:'$15,000.00',monthlyOut:'$1,250.00'});
check('total-cost-car-ownership',{purchasePrice:60000,downPayment:0,tradeCredit:0,annualRate:0,loanMonths:60,ownershipYears:5,annualMiles:0,mpg:30,fuelPrice:0,annualInsurance:0,maintenancePerMile:0,annualRegistration:0,resaleValue:70000},{mainResult:'-$10,000.00'});
check('mortgage-extra-payment',{loanAmount:12000,interestRate:0,termYears:2,extraPayment:500},{mainResult:'1 yr 0 mo',newPayoffOut:'1 yr 0 mo',interestSavedOut:'$0.00'});
check('mortgage-extra-payment',{loanAmount:12000,interestRate:0,termYears:200,extraPayment:0},{mainResult:'Enter a term of 1 to 1200 whole months',newPayoffOut:'—'});
check('mortgage-extra-payment',{loanAmount:12000,interestRate:0,termYears:100,extraPayment:0},{mainResult:'0 yrs 0 mo',newPayoffOut:'100 yrs 0 mo'});
check('biweekly-mortgage',{balance:1200,rate:0,years:1},{mainResult:'1.0 years',normalPay:'$100.00',saved:'$0.00'});
check('biweekly-mortgage',{balance:1200,rate:0,years:200},{mainResult:'Enter a term of 1 to 1200 whole months',normalPay:'—'});
check('credit-card-interest',{balance:1000,apr:0,payment:100},{mainResult:'10 months',totalInterest:'$0.00'});
check('credit-card-interest',{balance:50000,apr:0,payment:10},{mainResult:'Payoff exceeds 100 years',firstInterest:'—',totalInterest:'—'});
check('credit-card-interest',{balance:1000,apr:-1,payment:100},{mainResult:'Invalid input',totalInterest:'—'});
// $100,000 net profit, $20,000 tax and $80,000 take-home plus $20,000 expenses.
check('freelance-hourly-rate',{targetTakeHome:80000,annualExpenses:20000,taxRate:20,billableHoursWeek:25,workingWeeks:40,unpaidAllowance:0},{mainResult:'$120.00/hour',revenueOut:'$120,000.00',taxOut:'$20,000.00'});
check('freelance-hourly-rate',{targetTakeHome:80000,annualExpenses:20000,taxRate:20,billableHoursWeek:25,workingWeeks:40,unpaidAllowance:20},{mainResult:'$150.00/hour',revenueOut:'$150,000.00',taxOut:'$20,000.00'});
check('invoice-factoring',{invoiceAmount:1000,advanceRate:90,baseFee:20,weeks:1,weeklyFee:0},{mainResult:'$900.00',feeOut:'$200.00',reserveOut:'$0.00',netOut:'$800.00'});
check('cost-of-employee',{annualSalary:1000,payrollTaxRate:10,benefitsCost:0,bonusCost:200,equipmentCost:0,recruitingCost:0,annualHours:100},{mainResult:'$1,320.00',hourlyOut:'$13.20'});
check('payroll-burden',{monthlyWages:1000,payrollTaxRate:10,workersCompRate:0,benefits:0,retirementRate:0,bonuses:200,admin:0},{mainResult:'$1,320.00',taxesOut:'$120.00'});
check('working-capital',{cash:100,receivables:50,inventory:30,otherAssets:20,currentLiabilities:50},{mainResult:'$150.00',currentRatioOut:'4',quickRatioOut:'3'});
check('working-capital',{cash:100,receivables:50,inventory:30,otherAssets:20,currentLiabilities:0},{currentRatioOut:'Undefined (no current liabilities)',quickRatioOut:'Undefined (no current liabilities)'});
check('macro-calculator',{dailyCalories:2000,proteinPercent:40,carbPercent:40,fatPercent:40},{mainResult:'Enter macro percentages that total 100%',carbOut:'—'});
check('macro-calculator',{dailyCalories:2000,proteinPercent:30,carbPercent:40,fatPercent:30},{mainResult:'150 g/day',carbOut:'200 g/day',fatOut:'66.7 g/day',assignedOut:'2,000 calories'});
check('pace',{distance:1,minutes:4,seconds:59.6},{main:'5:00 /km'});
check('inflation',{amount:1000,rate:-100,years:2},{mainResult:'Enter an inflation rate above -100%',power:'—'});
check('inflation',{amount:1000,rate:-10,years:1},{mainResult:'$900.00',power:'$1,111.11'});
const retirement=load('retirement.html',{currentAge:65,retirementAge:60});retirement.click();assert.ok(retirement.out('retirementBalance').startsWith('Enter a future retirement age'));assertions++;cases++;
check('investment',{initial:1000,monthly:100,rate:-100,years:1},{futureValue:'Enter a return above -100%',contributions:'—'});
check('401k',{salary:12000,employeeRate:10,matchRate:0,matchLimit:0,currentBalance:0,years:0.1,returnRate:0},{futureBalance:'$100.00',totalContributions:'$100.00',growth:'$0.00'});
// IRS taxable-income cap excludes net capital gain. The 2026 active-QBI
// minimum is an explicit user-confirmed eligibility assumption.
check('qualified-business-income-deduction',{qbi:100000,rate:20,taxable:100000,caprate:20,netCapitalGain:80000,activeQbi:0,limitMode:'none',otherlimit:''},{mainResult:'$4,000.00',o2:'$4,000.00',o3:'No additional limit entered'});
check('qualified-business-income-deduction',{qbi:1000,rate:20,taxable:1000,caprate:20,netCapitalGain:0,activeQbi:1000,limitMode:'none'},{mainResult:'$400.00'});
check('qualified-business-income-deduction',{qbi:1000,rate:20,taxable:1000,caprate:20,netCapitalGain:0,activeQbi:0,limitMode:'none'},{mainResult:'$200.00'});
check('qualified-business-income-deduction',{qbi:100000,rate:20,taxable:100000,caprate:20,netCapitalGain:0,activeQbi:0,limitMode:'entered',otherlimit:7000},{mainResult:'$7,000.00'});
check('qualified-business-income-deduction',{limitMode:'entered',otherlimit:''},{mainResult:'Invalid input',o2:'—'});
// Official Medicare example: two full late-enrollment years, 2026 premium;
// the combined $243.48 monthly amount rounds to $243.50.
check('medicare-part-b-late-enrollment-penalty',{premium:202.9,years:2,rate:10,months:12,people:1},{mainResult:'$487.20',o1:'$40.60',o2:'$243.50',o3:'$2,434.80'});
check('medicare-part-b-late-enrollment-penalty',{years:1.5},{mainResult:'Invalid input',o2:'—'});
check('medicare-advantage-out-of-pocket',{premium:35,allowed:12000,share:20,copays:900,max:0},{mainResult:'$420.00',o1:'$0.00',o3:'$3,300.00'});
check('trade-in-equity',{tradeValue:26000,loanBalance:18500,purchasePrice:42000,cashDown:3000,taxCreditRate:7,fees:2500},{mainResult:'$7,500.00',taxOut:'$1,820.00',financeOut:'$35,120.00'});
check('trade-in-equity',{tradeValue:50000,loanBalance:0,purchasePrice:20000,cashDown:0,taxCreditRate:10,fees:0},{taxOut:'$2,000.00',financeOut:'$0.00'});
check('car-repair-vs-replace',{repair:4500,current:9000,years:3,keepResale:3000,down:5000,monthly:650,months:36,resale:8000},{mainResult:'Repair is lower by $18,900.00',o1:'$3,500.00',o2:'$29,400.00'});
check('car-repair-vs-replace',{years:1,months:36},{mainResult:'Use a comparison period within the repaired vehicle life',o2:'—'});
for(const name of ['braces-cost','dental-implant-cost','hearing-aid-cost','invisalign-cost','lasik-cost','root-canal-cost']){
 check(name,{units:1,unitCost:100,providerFee:0,facilityFee:0,otherFee:0,coverageRate:0,deductible:0,copay:200},{mainResult:'$100.00',insuranceOut:'$0.00',patientFixedOut:'$100.00'});
 check(name,{units:1,unitCost:1000,providerFee:0,facilityFee:0,otherFee:0,coverageRate:80,deductible:200,copay:50},{mainResult:'$410.00',insuranceOut:'$590.00',patientFixedOut:'$250.00'});
}
check('equipment-financing',{equipmentPrice:1000,downPayment:0,annualRate:0,termYears:1,residualValue:2000},{mainResult:'Enter a residual that permits a nonnegative payment',totalOut:'—'});
check('cap-rate',{propertyValue:100000,annualRent:1000,annualExpenses:1500},{mainResult:'-0.50%',noiOut:'-$500.00'});
check('dscr',{annualNoi:-1000,annualDebtService:1000},{mainResult:'-1.00x',surplusOut:'-$2,000.00'});
check('roas',{revenue:0,adSpend:100},{mainResult:'0.00x',profitBeforeOtherCostsOut:'-$100.00',breakEvenMarginOut:'Undefined (zero revenue)'});
check('profit-margin',{revenue:0,cost:100},{mainResult:'Undefined (zero revenue)',profit:'-$100.00'});
check('profit-margin',{revenue:100,cost:0},{mainResult:'100.00%',markup:'Undefined (zero cost)'});
check('pay-raise',{old:0,newv:1000},{mainResult:'Undefined (zero starting pay)',increase:'$1,000.00'});
check('rental-property',{downPayment:0},{cocOut:'Undefined (zero entered cash)'});
check('inventory-turnover',{costOfGoodsSold:0,beginningInventory:0,endingInventory:0,periodDays:365},{mainResult:'Undefined (zero inventory)',daysOut:'Not defined at zero turnover'});
check('cpc',{adSpend:0,clicks:100,budget:100},{mainResult:'$0.00',futureOut:'Undefined (zero CPC)',thousandOut:'Undefined (zero CPC)'});
check('cpa',{adSpend:0,acquisitions:100,budget:100,averageValue:100},{mainResult:'$0.00',futureOut:'Undefined (zero CPA)',roasOut:'Undefined (zero spend)'});
console.log(JSON.stringify({status:'passed',referenceCases:cases,assertions}));
