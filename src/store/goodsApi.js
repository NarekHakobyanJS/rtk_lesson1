import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const goodsApi = createApi({
    reducerPath: "goodsApi",
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3002/' }),
    tagTypes: ["Products"],
    endpoints: (builder) => ({
        getGoods: builder.query({
            query: (limit = '') => `goods?${limit && `_limit=${limit}`}`,
            providesTags: (result = [], error, arg) => [
                {type : 'Products', id : "LIST"},
                ...result.map(({ id }) => ({ type: 'Products', id }))
            ]
        }),
        addProduct: builder.mutation({
            query: (body) => ({
                url: 'goods',
                method: "POST",
                body
            }),
            invalidatesTags: [{ type: "Products", id: 'LIST' }]
        }),
        deleteProduct : builder.mutation({
            query : (id) => ({
                url : `goods/${id}`,
                method : "DELETE"
            }),
            invalidatesTags: [{ type: "Products", id: 'LIST' }]
        })
    })
})

export const { useGetGoodsQuery, useAddProductMutation, useDeleteProductMutation } = goodsApi