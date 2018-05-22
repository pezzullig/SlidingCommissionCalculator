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
const profitBoundary = [0, 12.5, 100, 2000];

const profitCommission = [0, 5, 10, 20];

const roundString = string => {
  let newString = string;
  newString = string.replace(
    /([0-9]+.[0-9]+)/g,
    (g0, g1) => ` ${Math.round(g1 * 100) / 100} `
  );

  return newString;
};
const calculateProfit = (
  initialInvestment,
  actualProfitPercentage,
  engB = engagementBoundary,
  engC = engagementCommission,
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
      investment = initialInvestment * (1 - engC[i] / 100);
      BertieCommission.engagement = initialInvestment * engC[i] / 100;
      fee = engC[i];
      break;
    }
  }
  const grossProfit = investment * actualProfitPercentage * 0.01;

  let w1 = "";
  for (let i = 1; i < profB.length; i += 1) {
    if (actualProfitPercentage > profB[i - 1]) {
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
        x}.   <br\>`;
    } else {
      break;
    }
  }
  const customerProfit =
    grossProfit - BertieCommission.profit - BertieCommission.engagement;
  const customerPercentage = customerProfit / initialInvestment * 100;
  const BertieProfit =
    (BertieCommission.engagement + BertieCommission.profit) *
    100 /
    initialInvestment;
  const explanation = `The Client has invested ${initialInvestment}, an initial engagement fee of ${fee}% which would be $${
    BertieCommission.engagement
  } is taken. Leaving the company $${investment} left to invest <br\> <br\>
    Then if the company were to make ${actualProfitPercentage}% of that investment, meaning they turned $${investment} into $${investment +
    grossProfit} thus making a gross profit of $${grossProfit}. Then the commision on profit is split as follows <br\> <br\>
    ${w1} <br\>
    Hence if the company makes ${actualProfitPercentage}% from an initial investment of ${initialInvestment}, the client will have ${initialInvestment +
    customerProfit} making a percentage of ${customerPercentage}%, the company will take $${BertieCommission.engagement +
    BertieCommission.profit} which is ${BertieProfit}%.
  `;
  return {
    investment: Math.round(investment),
    customerProfit: Math.round(customerProfit),
    customerPercentage: Math.round(customerPercentage * 100) / 100,
    BertieCommission: Math.round(BertieProfit * 100) / 100,
    explanation: roundString(explanation)
  };
};

$(document).ready(function() {
  $(".contact2-form-btn").click(function() {
    const inv = $("#investment").val() * 1;
    const profit = $("#profit").val() * 1;
    let info = calculateProfit(inv, profit);

    $("#result1").text(`Client Profit:`);
    $("#result2").text(`$${info.customerProfit} `);
    $("#result3").text(`Client Percentage Profit: `);
    $("#result4").text(`$${info.customerPercentage}% `);
    $("#ello").text("");
    $("#ello").append(info.explanation);
  });
});
