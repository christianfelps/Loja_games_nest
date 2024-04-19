import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categoria } from "../../categoria/entities/categoria.entities";

@Entity({name: "tb_produto"})

export class Produto {
    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    nomeJogo: string

    @IsNotEmpty()
    @Column({nullable: false})
    preco: number

    @IsNotEmpty()
    @Column({length: 1000, nullable: false})
    foto: string

    @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
        onDelete: "CASCADE"
    })
    categoria: Categoria
    tema: any;




}