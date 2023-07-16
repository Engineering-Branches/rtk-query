import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export interface ToDoProps {
    id: number
    text: string
    active: boolean
    done: boolean
}

export const toDoApi = createApi({
    reducerPath: "toDoApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://run.mocky.io/v3/9c345d06-89f7-4696-af70-217f9a55374a" }),
    tagTypes: ["ToDos"],
    endpoints: (builder) => ({
        getAllToDos: builder.query<ToDoProps[], void>({
            query: () => "/todos",
            providesTags: [{type: "ToDos", id: "LIST"}],
        }),
        addToDo: builder.mutation<string, string>({
            query: (text) => ({
                url: "/todos",
                method: "POST",
                body: { text },
            }),
            invalidatesTags: ["ToDos"],
        }),
        updateToDo: builder.mutation<ToDoProps, Partial<ToDoProps>>({
            query: ({ id, ...body }) => ({
                url: `/todos/${id!}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["ToDos"],
        }),
        deleteToDo: builder.mutation<ToDoProps, number>({
            query: (id) => ({
                url: `/todos/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [{type: "ToDos", id: "LIST"}],
        }),
    }),
})