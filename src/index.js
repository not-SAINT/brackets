module.exports = function check(str, bracketsConfig) {
  let sequence = [];
  let leftSet = new Set();
  let rigthSet = new Set();
  let same = new Set();
  let flag = {};
  let pairs = new Set();

  for (let i = 0; i < bracketsConfig.length; i++) {
    if (bracketsConfig[i][0] != bracketsConfig[i][1]) {
      leftSet.add(bracketsConfig[i][0]);
      rigthSet.add(bracketsConfig[i][1]);
    }
    else {
      same.add(bracketsConfig[i][0]);
      flag['bracketsConfig[i][0]'] = false;
    }

    pairs.add(bracketsConfig[i][0] + bracketsConfig[i][1]);
  }

  if (rigthSet.has(str[0]))
    return false;
  else
    sequence.push(str[0]);

  if (same.has(str[0]))
    flag[str[0]] = true;

  for (let i = 1; i < str.length; i++) {
      if (leftSet.has(str[i]))
        sequence.push(str[i]);
      if (rigthSet.has(str[i]))
        if (!pairs.has(sequence[sequence.length - 1] + str[i]))
          return false;
        else
          sequence.pop();
      if (same.has(str[i]))
        if (flag[str[i]] && (!pairs.has(sequence[sequence.length - 1] + str[i])))
          return false;
        else if (flag[str[i]]) {
            sequence.pop();
            flag[str[i]] = false;
          }
          else {
            sequence.push(str[i]);
            flag[str[i]] = true;
          }
  }

  if (sequence.length > 0)
    return false;

  return true;
}
