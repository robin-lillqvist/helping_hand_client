const initialState = {
  products: [],
  showRequestForm: false,
  task: { products: [] },
  taskID: null,
  message: "",
  showLogin: false,
  showRegister: false,
  authenticate: false,
  userEmail: undefined,
  userID: undefined,
  showHelpMap: false,
  requests: [
    { id: 1,
      products: [
        {
          amount: 5,
          name: "Milk",
          total: "30.0",
        },
      ],
      total: "150.0",
      long: 1,
      lat: 2,
      user: {
        id: 2,
        email: "robin2@mail.com",
      }
    }
  ],
};

export default initialState;
