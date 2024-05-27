import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PokemonDetailType, fetchPokemonDetailAPI,  } from "../Service/pokemonService";
import { RootState } from ".";

export const fetchPokemonDetail = createAsyncThunk(
    'pokemon/fetchPokemonDetail',
    async (name:string) => {
        const response = await fetchPokemonDetailAPI(name)
        return response
    }, {
        condition: (name, { getState }) => {
            const { pokemonDetail } = getState() as RootState
            const pokemon = pokemonDetail.pokemonDetails[name]

            return !pokemon;
        }
    }
)

interface PokemonsDetailState {
    pokemonDetails: Record<string, PokemonDetailType>
}

const initialState = {
    pokemonDetails: {}
} as PokemonsDetailState

const pokemonDetailSlice = createSlice({
    name: 'pokemonDetail',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPokemonDetail.fulfilled, (state, action:PayloadAction<PokemonDetailType>) => {
            state.pokemonDetails = {
                ...state.pokemonDetails,
                [action.payload.name]: action.payload
            }
        })
    },
})

export const pokemonDetailReducer = pokemonDetailSlice.reducer