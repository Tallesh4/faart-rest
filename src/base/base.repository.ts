import MongooseRepository from "./repositories/mongoose/mongoose.repository";
import { ObjectId } from "mongodb";

export interface BaseRepositoryInterface<T> {
    all: (query?: Record<string, unknown>) => this
    count: (query?: Record<string, unknown>) => Promise<number>
    find: (query?: Record<string, unknown>) => this
    first: (query?: Record<string, unknown>) => this
    findById: (id: id | string | undefined) => this
    startAt: (startAt: number) => this
    sort: (sort: object) => this
    size: (size: number) => this
    where: (key: string, value: object) => this
    with: (...relations: Array<string>) => this
    select: (fields: Record<string, unknown>) => this
    group: (fields: Record<string, unknown>) => this
    firstOrCreate: (props: Record<string, unknown>) => Promise<T | undefined>
    create: (props: T) => Promise<T | undefined>
    insertMany: (props: T[]) => Promise<T[] | undefined>
    updateById: (id: id | string | undefined, props: any) => Promise<T[] | T | undefined>
    updateManyById: (ids: id[] | string[] | undefined, props: any) => Promise<unknown>
    deleteById: (id: id | string | undefined) => Promise<T[] | T | undefined>
    deleteMany: (query?: Record<string, unknown>) => Promise<void | undefined>
    unwind: (unwind: string) => this
    clear: () => Promise<void>
    exec: () => Promise<T[] | T | undefined>
}

const BaseRepository = MongooseRepository;
export type id = ObjectId

export const parseId = function(value: string) {
	return new ObjectId(value);
};

export default BaseRepository;