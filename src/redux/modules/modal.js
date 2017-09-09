const LOAD = 'teamhub/modal/LOAD';

const initialState = {
  modalVisible: false,
  modalTitle: '',
  modalContent: '',
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}