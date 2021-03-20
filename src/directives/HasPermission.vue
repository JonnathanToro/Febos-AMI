<script>
// Initialize the annoying-background directive.
export default {
  inserted(el, binding, vnode) {
    const store = vnode.context.$store;

    const permiso = binding.value;
    if (permiso) {
      const tienePermiso = store.getters['Usuario/hasPermission'](permiso);
      if (!tienePermiso) {
        vnode.elm.parentElement.removeChild(vnode.elm);
      }
    }
  }
};
</script>
