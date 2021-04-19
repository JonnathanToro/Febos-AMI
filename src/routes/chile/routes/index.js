import eBillRoutes from '@/routes/chile/routes/eBillRoutes';
import approvalRoutes from '@/routes/chile/routes/approvalRoutes';
import toolsRoutes from '@/routes/chile/routes/toolsRoutes';
import operationsRoutes from '@/routes/chile/routes/operationRoutes';
import dntRoutes from '@/routes/chile/routes/dntRoutes';
import documentManagementRoutes from '@/routes/chile/routes/documentManagementRoutes';
import templateRoutes from '@/routes/chile/routes/templateRoutes';

export default [
  ...eBillRoutes,
  ...approvalRoutes,
  ...toolsRoutes,
  ...operationsRoutes,
  ...dntRoutes,
  ...documentManagementRoutes,
  ...templateRoutes
];
