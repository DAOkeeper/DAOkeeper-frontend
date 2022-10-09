export const getTimestampArray = (
  startDate: string | number | Date,
  interval: number | null,
  rounds: number | null,
) => {
  const numOfrounds = Number(rounds);
  console.log('>>>argsss', startDate, interval, numOfrounds);
  const timeArray = [] as number[];

  console.log('>>>timeArray', timeArray);
  const startDateObj = new Date(startDate);

  console.log('>>>startDateObj', startDateObj);
  const iterator = new Array(numOfrounds).fill(0);

  console.log('rounds >>>>>> ', numOfrounds);
  console.log('type of rounds', typeof numOfrounds);
  console.log('iterator >>>>>', iterator);
  let currentDate = startDateObj;

  iterator.map((_) => {
    console.log(_, '번째 도는 중');
    const unixTimestamp = Math.floor(currentDate.getTime() / 1000);

    timeArray.push(unixTimestamp);
    currentDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + interval,
    );
    console.log('currentDate >>>>>>>> ', currentDate);
  });

  console.log('timeArray >>>>>> ', timeArray);

  return timeArray;
};
