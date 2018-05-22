const engagementCommission = [
  2.0,
  2.2,
  2.4,
  2.6,
  2.8,
  2.9,
  3.0,
  3.2,
  3.4,
  3.6,
  3.8,
  4.0,
  4.0
];
const engagementBoundary = [
  3000000,
  2750000,
  2500000,
  2250000,
  2000000,
  1750000,
  1500000,
  1250000,
  1000000,
  750000,
  500001,
  500000,
  0
];
const profitBoundary = [
  0,
  10.0,
  12.5,
  15.0,
  17.5,
  20.0,
  22.5,
  25.0,
  27.5,
  30.0
];
const profitCommission = [0, 5, 5, 10, 10, 15, 15, 20, 20, 25];

const calculateProfit = (
  initialInvestment,
  actualProfitPercentage,
  engB = engagementBoundary,
  engC = engagementBoundary,
  profB = profitBoundary,
  profC = profitCommission
) => {
  let BertieCommission = {
    engagement: 0,
    profit: 0
  };

  let investment = 0;
  const prevProfit = 0;
  // const investmentBands = profitBoundary.map(b => )
  let fee = 0;
  for (let i = 0; i < engB.length; i += 1) {
    if (initialInvestment >= engB[i]) {
      console.log("stop");

      investment = initialInvestment * (1 - engC[i] / 100);
      BertieCommission.engagement = initialInvestment * engC[i] / 100;
      fee = engC[i];
      break;
    }
  }
  const grossProfit = investment * actualProfitPercentage * 0.01;
  console.log(grossProfit);
  let w1 = "";
  for (let i = 1; i < profB.length; i += 1) {
    console.log("added profit", i, profB[i]);
    if (actualProfitPercentage >= profB[i - 1]) {
      console.log("bigger");
      const x =
        profC[i] /
        100 *
        (investment *
          (Math.min(profB[i], actualProfitPercentage) - profB[i - 1]) /
          100);
      BertieCommission.profit += x;
      w1 += `The ${profB[i - 1]}% - ${profB[i]}% profit band has a ${
        profC[i]
      }% commission. Therefore $${investment *
        (Math.min(profB[i], actualProfitPercentage) - profB[i - 1]) /
        100} out of $${grossProfit} will have a commission of $${x}. Leaving the client with $${investment *
        (Math.min(profB[i], actualProfitPercentage) - profB[i - 1]) /
        100 -
        x}.   \n`;
      console.log(BertieCommission.profit);
    } else {
      console.log("break");
      break;
    }
  }
  const customerProfit =
    grossProfit - BertieCommission.profit - BertieCommission.engagement;
  const customerPercentage = customerProfit / initialInvestment * 100;
  const explanation = `Investor Has put in ${initialInvestment}. Therefore you take an initial engagement fee of ${fee}% which would be $${
    BertieCommission.engagement
  }. Leaving the company $${investment} left to invest \n
  Then if the company were to make ${actualProfitPercentage}% profit out of that investment, meaning they turned $${investment} into $${investment +
    grossProfit} thus making a gross profit of $${grossProfit}. Then the commision on profit is split as follows \n \n
    ${w1} \n
    Hence if the company makes ${actualProfitPercentage}% from an initial investment of ${initialInvestment}, the client will walk away with ${initialInvestment +
    customerProfit} making a percentage of ${customerPercentage}%, the company will take $${BertieCommission.engagement +
    BertieCommission.profit} which is ${BertieCommission.engagement +
    BertieCommission.profit * 100 / investment}%.
  `;
  return {
    investment,
    customerProfit,
    customerPercentage,
    BertieCommission,
    explanation
  };
};
const dumy = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
console.log(calculateProfit(1000, 16));
export default scaleCalculator;
