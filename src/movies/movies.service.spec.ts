import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll()', () => {
    it('should return an array', () => {
      const result = service.getAll();

      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne()', () => {
    it('should be return movie obj', () => {
      // 만약 movie가 만들어져 있지 않다면 문제가 되므로, 먼저 무비를 create 하자
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2020,
      });

      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it('should throw 404 error', () => {
      try {
        service.getOne(9999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('deleteOne()', () => {
    it('deletes a movie', () => {
      // 만약 movie가 만들어져 있지 않다면 문제가 되므로, 먼저 무비를 create 하자
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2020,
      });

      const allMovies = service.getAll();
      service.deleteOne(1);
      const afterDelete = service.getAll();

      expect(afterDelete.length).toEqual(allMovies.length - 1);
    });

    it('should return a 404 error', () => {
      try {
        service.deleteOne(9999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create()', () => {
    it('should be create a movie', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2020,
      });
      const afterCreate = service.getAll().length;

      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });
});
