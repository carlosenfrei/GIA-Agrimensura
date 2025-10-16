import { createSlice } from '@reduxjs/toolkit'



const instrumentalSlice = createSlice({
    name: "categorieRoom",
    initialState:{
        categorieSelected: "",
        subCategorieSelected: "",
        //subCagegorieFilterByCategorie:[],
        instrumentalFilterBySubCategorie:[],
        instrumentalSelect: {},
        keyword: "",
        instrumentals: [], 
    },
    reducers:{
        selectCategorie: (state, action)=>{
            console.log("Seleccion de categoria ",action)
            state.categorieSelected = action.payload
            state.subCategorieSelected = ""
            state.keyword = "" 
        },

        selectSubCategorie: (state, action) =>{
            state.subCategorieSelected = action.payload
            state.keyword = "" 
        },
        
        selectKeyword: (state, action) => {
            state.keyword = action.payload
        },

        filterAndGroupInstrumental: (state, action)=>{
            const rawInstruments = action.payload || [] // Recibe la lista filtrada desde el componente
            const keyword = state.keyword?.toLowerCase().trim()

            state.instrumentals = rawInstruments;
            const grouped = rawInstruments.reduce((acc, item) => {
                const key = `${item.Categoria}_${item.SubCategoria}_${item.Marca}_${item.Modelo}`
                if (!acc[key]) acc[key] = { ...item, cantidad: 1 }
                else acc[key].cantidad += 1
                return acc
            }, {})
            
            let result = Object.values(grouped)


            if (keyword) {
                result = result.filter((item) =>

                item.Marca?.toLowerCase().includes(keyword) || 
                item.Modelo?.toLowerCase().includes(keyword) ||
                item.Descripción?.toLowerCase().includes(keyword)
                )
            }

            state.instrumentalFilterBySubCategorie = result
        },

        selectInstrumental: (state, action)=>{
            state.instrumentalSelect = action.payload
        },

        addInstrument: (state, action) => {
            const newInstrument = action.payload; 
            state.products.push(newInstrument);
        },
        editInstrument: (state, action) => {
            const { id, updates } = action.payload; // Espera { id: '...', updates: { Marca: 'Nuevo', ... } }
    
            const index = state.products.findIndex(instrument => 
                instrument.ID.toString() === id.toString() 
            ); 

            if (index !== -1) {
                state.products[index] = {
                    ...state.products[index],
                    ...updates, // Aplica las modificaciones sobre el instrumento existente
                };
            }
        },
    },
})


export const {selectCategorie, selectSubCategorie, selectInstrumental, selectKeyword, filterAndGroupInstrumental, addInstrument, editInstrument } = instrumentalSlice.actions;
export default instrumentalSlice.reducer;