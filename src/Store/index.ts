import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { imageTypeReducer } from "./imageTypeSlice";
import { pokemonReducer } from "./pokemonsSlice";
import { pokemonDetailReducer } from "./pokemonDetailSlice";

export const store = configureStore({
    reducer: {
        imageType: imageTypeReducer,
        pokemons: pokemonReducer,
        pokemonDetail: pokemonDetailReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()