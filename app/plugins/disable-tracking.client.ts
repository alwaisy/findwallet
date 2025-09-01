export default defineNuxtPlugin(() => {
  // Disable Umami tracking if ?itsmebob parameter is present
  if (process.client) {
    const route = useRoute();
    if (route.query.itsmebob) {
      console.log('🔍 Umami tracking disabled for development');
      
      // Override umTrackView to do nothing
      window.umTrackView = () => {
        console.log('📊 Umami tracking disabled - umTrackView called');
      };
      
      // Override umIdentify to do nothing
      window.umIdentify = (properties: any) => {
        console.log('📊 Umami tracking disabled - umIdentify called with:', properties);
      };
      
      // Override v-umami directive to do nothing
      if (window.Vue) {
        window.Vue.directive('umami', {
          mounted() {
            console.log('📊 Umami tracking disabled - v-umami directive called');
          }
        });
      }
    }
  }
});
