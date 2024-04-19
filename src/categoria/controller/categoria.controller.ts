import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { CategoriaService } from "../services/categoria.service";
import { Categoria } from "../entities/categoria.entities";

@Controller('/categorias')
    export class CategoriaController{
        constructor(private readonly categoriaService: CategoriaService ){}


        @Get()
        @HttpCode(HttpStatus.OK)
        findAll(): Promise<Categoria[]>{
            return this.categoriaService.findByAll()
        }

        @Get('/:id')
        @HttpCode(HttpStatus.OK)
        findById(@Param('id', ParseIntPipe)id: number): Promise<Categoria>{
            return this.categoriaService.findById(id)

    }

    @Get('/categoria/:categoria')
    @HttpCode(HttpStatus.OK)
    findByCategoria(@Param('categoria') categoria: string): Promise<Categoria[]>{
    return this.categoriaService.findByDescricao(categoria)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() categoria: Categoria): Promise<Categoria>{
        return this.categoriaService.create(categoria)
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() categoria: Categoria): Promise<Categoria>{
        return this.categoriaService.update(categoria)
    }

    @Delete()
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(id: number){
        return this.categoriaService.delete(id)
    }

}
