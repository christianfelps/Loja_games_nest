import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ProdutoService } from "../services/produto.service";
import { Produto } from "../entities/produto.entity";

@Controller('/produtos')
export class ProdutoController {
    constructor(private readonly produtoService: ProdutoService){}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Produto[]>{
        return this.produtoService.findAll();
      }

      @Get('/:id')
      @HttpCode(HttpStatus.OK)
      findById(@Param('id', ParseIntPipe) id:number): Promise<Produto>{
        return  this.produtoService.findById(id);
      }

      @Get('/nomejogo/:nome')
      @HttpCode(HttpStatus.OK)
      findByNome(@Param('nome') nome:string): Promise<Produto[]>{
     return  this.produtoService.findByNome(nome);
      }


      @Post()
      @HttpCode(HttpStatus.OK)
      create(@Body() produto:Produto): Promise<Produto>{
        return  this.produtoService.create(produto);
      }

      @Put()
      @HttpCode(HttpStatus.OK)
      update(@Body() produto: Produto): Promise<Produto>{
       return this.produtoService.update(produto) 
      }

      @Delete('/:id')
      @HttpCode(HttpStatus.NO_CONTENT)
      delete(@Param('id', ParseIntPipe) id: number){
        return this.produtoService.delete(id);
      }
      @Get('/precomaior/:preco')
      @HttpCode(HttpStatus.OK)
      findbymaior(@Param('preco')preco:number): Promise<Produto[]>{
        return this.produtoService.findByMaiorQue(preco)
      }

      @Get('/precomenor/:preco')
      @HttpCode(HttpStatus.OK)
      findbymenor(@Param('preco')preco:number): Promise<Produto[]>{
        return this.produtoService.findByMenorQue(preco)
      }









    }