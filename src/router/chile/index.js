import layoutPrivate from './layoutPrivate';
import layoutPublic from './layoutPublic';
import layoutPagesPublic from './layoutPagesPublic';
import layoutPagesPrivate from './layoutPagesPrivate';

export default [
  ...layoutPrivate,
  ...layoutPublic,
  ...layoutPagesPublic,
  ...layoutPagesPrivate
];
