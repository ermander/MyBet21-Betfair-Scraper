const mergeOdds = (oneXTwoOdds, underOverOdds, goalNoGoalOdds) => {
  const odds = [];

  for (let i = 0; i < oneXTwoOdds.length; i++) {
    const checkExistenceUnderOver = underOverOdds.filter(
      (odd) =>
        odd.home === oneXTwoOdds[i].home && odd.away === oneXTwoOdds[i].away
    );
    const checkExistenceGoalNoGoalOdds = goalNoGoalOdds.filter(
      (odd) =>
        odd.home === oneXTwoOdds[i].home && odd.away === oneXTwoOdds[i].away
    );
    if (
      checkExistenceUnderOver.length !== 0 &&
      checkExistenceGoalNoGoalOdds.length !== 0
    ) {
      const odd = {
        home: oneXTwoOdds[i].home,
        away: oneXTwoOdds[i].away,
        oneOdd: oneXTwoOdds[i].oneOdd,
        oneOddLiquidity: oneXTwoOdds[i].oneOddLiquidity,
        xOdd: oneXTwoOdds[i].xOdd,
        xOddLiquidity: oneXTwoOdds[i].xOddLiquidity,
        twoOdd: oneXTwoOdds[i].twoOdd,
        twoOddLiquidity: oneXTwoOdds[i].twoOddLiquidity,
        under2_5Odd: checkExistenceUnderOver[0].under2_5Odd,
        under2_5OddLiquidity: checkExistenceUnderOver[0].under2_5OddLiquidity,
        over2_5Odd: checkExistenceUnderOver[0].over2_5Odd,
        over2_5OddLiquidity: checkExistenceUnderOver[0].over2_5OddLiquidity,
        goalOdd: checkExistenceGoalNoGoalOdds[0].goalOdd,
        goalOddLiquidity: checkExistenceGoalNoGoalOdds[0].goalOddLiquidity,
        noGoalOdd: checkExistenceGoalNoGoalOdds[0].noGoalOdd,
        noGoalOddLiquidity: checkExistenceGoalNoGoalOdds[0].noGoalOddLiquidity,
      };
      odds.push(odd);
    }
  }
  return odds;
};

module.exports = mergeOdds;
