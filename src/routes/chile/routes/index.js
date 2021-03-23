import eBillRoutes from '@/routes/chile/routes/eBillRoutes';
import approvalRoutes from '@/routes/chile/routes/approvalRoutes';
import toolsRoutes from '@/routes/chile/routes/toolsRoutes';
import dntRoutes from '@/routes/chile/routes/dntRoutes';
import templateRoutes from '@/routes/chile/routes/templateRoutes';

export default [
  ...eBillRoutes,
  ...approvalRoutes,
  ...toolsRoutes,
  ...dntRoutes,
  ...templateRoutes
];
