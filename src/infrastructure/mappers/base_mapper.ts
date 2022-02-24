export interface BaseMapper<E, D> {
  toEntity(domain: D): E;

  fromEntity(entity: E): D;
}
