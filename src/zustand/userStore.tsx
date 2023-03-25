import { StateCreator, create } from "zustand";
import { persist, createJSONStorage, PersistOptions } from "zustand/middleware";
type User = {
  username: string;
  email: String;
};
// // export const useUserStore = create((set) => ({
// //   user: null,
// //   setUser: (user: User) => set({ user }),
// // }));

// interface UserState {
//   user: User;
//   setUser: (to: User) => void;
// }

// export const useUserStore = create<UserState>()((set) => ({
//   user: {
//     username: "",
//   },
//   setUser: (user) => set((state) => ({ user })),
//   //   increase: (by) => set((state) => ({ bears: state.bears + by })),
// }));

type MyState = {
  // token: string | undefined
  // authenticated: boolean
  // authenticate: (username: string, password: string) => Promise<void>
  user: User;
  setUser: (to: User) => void;
};

type UserPersist = (
  config: StateCreator<MyState>,
  options: PersistOptions<MyState>
) => StateCreator<MyState>;

export const useUserStore = create<MyState>(
  (persist as UserPersist)(
    (set) => ({
      user: { username: "", email: "" },
      setUser: (user) => set({ user }),
      // token: undefined,
      // authenticated: false,
      // authenticate: async (_username, _password) => {
      //   set({ authenticated: true });
      // },
    }),
    { name: "user", storage: createJSONStorage(() => sessionStorage) }
  )
);
