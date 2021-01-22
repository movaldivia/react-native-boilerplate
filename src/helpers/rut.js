export const rutParser = (rut) => {
  let parsedRut = rut.replace('.', '').replace('.', '').replace('-', '');
  if (parsedRut.length === 0 || parsedRut === '-') {
    return '';
  }
  if (parsedRut.length < 4 && parsedRut.length > 0) {
    return parsedRut.slice(0, -1).concat('-', parsedRut.substr(-1, 1));
  }
  if (parsedRut.length >= 4 && parsedRut.length < 7) {
    return parsedRut
      .slice(0, -4)
      .concat('.', parsedRut.slice(-4, -1), '-', parsedRut.substr(-1, 1));
  }
  return parsedRut
    .slice(0, -7)
    .concat(
      '.',
      parsedRut.slice(-7, -4),
      '.',
      parsedRut.slice(-4, -1),
      '-',
      parsedRut.substr(-1, 1),
    );
};

export const validRut = (rut) => {
  if (!rut || rut.trim().length < 3) return false;
  const cleanRut = rut.replace(/[^0-9kK-]/g, '');

  if (cleanRut.length < 3) return false;

  const split = cleanRut.split('-');
  if (split.length !== 2) return false;

  const num = parseInt(split[0], 10);
  const dgv = split[1];

  const dvCalc = calculateDV(num);
  return dvCalc === dgv;
};

export const calculateDV = (rut) => {
  const body = `${rut}`;
  let sum = 0;
  let multiplier = 2;

  for (let i = 1; i <= body.length; i++) {
    const index = multiplier * body.charAt(body.length - i);

    sum += index;

    if (multiplier < 7) {
      multiplier += 1;
    } else {
      multiplier = 2;
    }
  }
  const dvExpected = 11 - (sum % 11);
  if (dvExpected === 10) return 'k';
  if (dvExpected === 11) return '0';
  return `${dvExpected}`;
};
