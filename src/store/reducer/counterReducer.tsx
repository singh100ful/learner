type State = {count: number};

type Action =
  | {type: 'INCREMENT'; payload: number}
  | {type: 'DECREMENT'}
  | {type: 'RESET'};

export const counterReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'INCREMENT':
      return {count: state.count + action.payload};

    case 'DECREMENT':
      return {count: state.count - 1};

    case 'RESET':
      return {count: 0};

    default:
      throw new Error('Unknow action Type');
  }
};
