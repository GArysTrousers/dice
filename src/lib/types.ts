export interface RollOptions {
  toHit: {
    roll: number;
    reroll: '1s' | 'all' | 'none';
    lethal: boolean;
    sustained: number;
  };
  toWound: {
    roll: number;
    reroll: string;
    devistating: boolean;
  };
  toSave: {
    roll: number;
  };
}

export function newRollOptions():RollOptions {
  return {
    toHit: {
      roll: 4,
      reroll: 'none',
      lethal: false,
      sustained: 0,
    },
    toWound: {
      roll: 4,
      reroll: 'none',
      devistating: false,
    },
    toSave: {
      roll: 4,
    },
  };
}
