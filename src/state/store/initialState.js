const initialState = {
  showHero: true,
  products: [],
  showRequestForm: false,
  task: { products: [] },
  taskID: null,
  message: "",
  showLogin: false,
  showRegister: false,
  authenticated: false,
  userEmail: undefined,
  fullName: undefined,
  phone: undefined,
  userID: undefined,
  showHelpMap: false,
  requests: [
    { id: 1,
      products: [ { amount: 1, name: "Milk", total: "30.0", }, ],
      total: "150.0",
      long: 1,
      lat: 2,
      user: { id: 2, email: "robin2@mail.com", }
    }
  ],
  requesterAddress: '',
  position: {lat: null, lng: null},
  showMarkerWindow: false,
  claimed_tasks: [],
  created_tasks: [],
  profile: {},
};

export default initialState;
