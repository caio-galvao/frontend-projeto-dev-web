import { create } from "zustand";

const useCompanyStore = create((set) => ({
  companies: [],
  createCompany: (company) =>
    set((state) => ({ companies: [company, ...state.companies] })),
  deleteCompany: (id) =>
    set((state) => ({
      companies: state.companies.filter((company) => company.id !== id)
    })),
  setCompanies: (companies) => set({ companies }),
}));

export default useCompanyStore;
