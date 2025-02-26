import { create } from 'zustand'
import axios  from 'axios'
import { data } from 'react-router-dom';

const showStore = create((set) => ({
    graphData: [],
    data: null,

    reset: ()=>{
        set({graphData: [], data: null})
    },
    fetchData:async (id)=>{
        const [graphRes, dataRes] = await Promise.all([
            axios.get(
                `https://api.coingecko.com/api/v3/coins/${id}/market_chart`,
                {
                    params: {
                        vs_currency: 'usd',
                        days: 121,
                    },
                }),
            axios.get(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&market_data=true`)
        ])

        const graphData= graphRes.data.prices.map(price=>{
            const [timestamp, p]=price;
            const date= new Date(timestamp).toLocaleDateString("en-us");
            return{
                Date: date,
                Price: p,
            };
        });
        console.log(dataRes)
        set({ graphData, data: dataRes.data });
    }
}));

export default showStore