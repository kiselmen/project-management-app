import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
type IProduct = {
  _id: string;
  name: string;
  avgRating: number;
  numRating: number;
  price: number;
  description: string;
  countInStock: number;
  quantity?: number;
  imageCover: string;
  images: string[];
  category: string;
  createdAt: Date;
  updatedAt: Date;
  slug: string;
  id: string;
};
export const createApiRequests = createApi({
  reducerPath: 'createApiRequests',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://final-task-backend-production-08b7.up.railway.app/',
  }),
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query(data) {
        return {
          url: 'auth/signup',
          method: 'POST',
          // credentials: 'include',
          body: data,
        };
      },
      // invalidatesTags: [{ type: 'Products', id: 'LIST' }],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformResponse: (response: { data: any }) => console.log(response.data),
    }),
  }),
});

export const { useCreateProductMutation } = createApiRequests;
