/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount: number, purpose: string) {
        return {
          payload: {
            amount,
            purpose,
          },
          meta: undefined,
          error: undefined,
        };
      },
      reducer(state, action) {
        if (state.loan > 0) return state;

        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance += action.payload.amount;
      },
    },
    payLoan(state) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    convertingCurrenty(state) {
      state.isLoading = true;
    },
  },
});


export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

export function deposit(amount: number, currency: string) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  return async function (dispatch: any) {
    // API CALL
    dispatch({ type: "account/convertingCurrenty" });

    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    const converted = data.rates.USD;

    // RETURN ACTION
    dispatch({ type: "account/deposit", payload: converted });
  };
}

export default accountSlice.reducer;

// export default function accountReducer(
//   state = initialStateAccount,
//   action: any
// ) {
//   switch (action.type) {
//     case "account/deposit":
//       return {
//         ...state,
//         balance: state.balance + action.payload,
//         isLoading: false,
//         // payload is data that is passed to reducer when action is dispatched
//       };
//     case "account/withdraw":
//       return {
//         ...state,
//         balance: state.balance - action.payload,
//       };
//     case "account/requestLoan":
//       if (state.loan > 0) return state;
//       return {
//         ...state,
//         loan: action.payload.amount,
//         loanPurpose: action.payload.purpose,
//         balance: state.balance + action.payload.amount,
//       };
//     case "account/payLoan":
//       return {
//         ...state,
//         loan: 0,
//         loanPurpose: "",
//         balance: state.balance - state.loan,
//       };
//     case "account/convertingCurrenty":
//       return {
//         ...state,
//         isLoading: true,
//       };
//     default:
//       return state;
//   }
// }

// // DEPOSIT
// export function deposit(amount: number, currency: string) {
//   if (currency === "USD") return { type: "account/deposit", payload: amount };

//   return async function (dispatch: any) {
//     // API CALL
//     dispatch({ type: "account/convertingCurrenty" });

//     const res = await fetch(
//       `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
//     );
//     const data = await res.json();
//     const converted = data.rates.USD;

//     // RETURN ACTION
//     dispatch({ type: "account/deposit", payload: converted });
//   };
// }

// // WITHDRAW
// export function withdraw(amount: number) {
//   return { type: "account/withdraw", payload: amount };
// }

// // REQUEST LOAN
// export function requestLoan(amount: number, purpose: string) {
//   return {
//     type: "account/requestLoan",
//     payload: { amount, purpose },
//   };
// }

// // PAY LOAN
// export function payLoan() {
//   return { type: "account/payLoan" };
// }
