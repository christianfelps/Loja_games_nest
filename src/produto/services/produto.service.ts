import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Produto } from "../entities/produto.entity";
import { DataSource, DeleteResult, ILike, Repository } from "typeorm";

@Injectable()
export class ProdutoService {
    constructor(
        @InjectRepository(Produto)
        private produtoRepository: Repository<Produto>

    ) { }

    
    async findAll(): Promise<Produto[]> {
        return await this.produtoRepository.find({
            relations:{
                categoria: true
            }
        })
    }

    async findById(id: number): Promise<Produto>{
        let produto =  this.produtoRepository.findOne({
            where:{
                id
            },
            relations:{
                categoria: true
            }
        });
        if(!produto)
            throw new HttpException('Produto não encontrado',HttpStatus.NOT_FOUND);
        return produto
    }
        async findByNome(nome: string): Promise<Produto[]>{
        return await this.produtoRepository.find({
            where:{
                nomeJogo: ILike(`%${nome}%`)

            },
            relations:{
                categoria: true
            }
        })
    }
    

    async create(produto: Produto): Promise<Produto>{
        return await this.produtoRepository.save(produto)

    }

    async update(produto: Produto): Promise<Produto>{
        let buscaProduto: Produto = await this.findById(produto.id);

        if(!buscaProduto || !produto.id)
            throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND);

        return await this.produtoRepository.save(produto);

    }

    async delete(id: number): Promise<DeleteResult>{
        let buscaProduto: Produto = await this.findById(id);

        if( !buscaProduto)
            throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND);

        return await this.produtoRepository.delete(id);
    }

    async findByMaiorQue(valor: number): Promise<Produto[]>{
       return this.produtoRepository.createQueryBuilder('produto')
            .where('produto.preco > :valor', { valor })
            .getMany();
    }
    async findByMenorQue(valor: number): Promise<Produto[]>{
        return this.produtoRepository.createQueryBuilder('produto')
             .where('produto.preco < :valor', { valor })
             .getMany();
     }
}