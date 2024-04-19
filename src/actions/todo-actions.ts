'use server';
import { revalidatePath } from 'next/cache';
import { asc, eq, not } from 'drizzle-orm';
import db from '@/db/drizzle';
import { todo } from '@/db/schema';

export const addTodo = async (id: number, text: string) => {
  await db.insert(todo).values({
    id: id,
    text: text,
  });
  revalidatePath('/');
};

export const getData = async () => {
  console.log('getData');
  const data = await db.select().from(todo).orderBy(asc(todo.id));
  revalidatePath('/');
  return data;
};

export const editTodo = async (id: number, text: string) => {
  await db
    .update(todo)
    .set({
      text: text,
    })
    .where(eq(todo.id, id));
  revalidatePath('/');
};

export const toggleTodo = async (id: number) => {
  await db
    .update(todo)
    .set({
      done: not(todo.done),
    })
    .where(eq(todo.id, id));
  revalidatePath('/');
};

export const deleteTodo = async (id: number) => {
  await db.delete(todo).where(eq(todo.id, id));
};
