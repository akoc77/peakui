# PeakUI API Documentation

PeakUI provides a flexible JavaScript API and global configuration objects to control and extend the framework's behavior programmatically.

---

## 🛠 Initialization

By default, PeakUI auto-initializes. However, you can manually create an instance with custom settings:

```javascript
const myPeak = new PeakUi({
  debug: true,      // Show performance metrics in console
  prefix: 'peak-',  // Force a custom prefix for all classes
  watch: true       // Automatically watch for DOM changes
});