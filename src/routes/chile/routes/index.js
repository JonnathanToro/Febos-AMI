import eBillRoutes from '@/routes/chile/routes/eBillRoutes';
import toolsRoutes from '@/routes/chile/routes/toolsRoutes';
import dntRoutes from '@/routes/chile/routes/dntRoutes';
import documentManagementRoutes from '@/routes/chile/routes/documentManagementRoutes';
import templateRoutes from '@/routes/chile/routes/templateRoutes';

export default [
  ...eBillRoutes,
  ...toolsRoutes,
  ...dntRoutes,
  ...documentManagementRoutes,
  ...templateRoutes
];
