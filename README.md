# ExpoAppCarousel
Google App/Product carousel clone

---

### Getting started

#### Installation

- Install all the dependencies of the project using `expo`. If the project is using yarn as the package manager, expo install will internally use yarn to handle the installation.

```bash
expo install
```

- To run the project, run the following command to start the metro server:

```bash
expo start android
```

or

```bash
expo start ios
```

---

### Workings
- App is using FlashList from Shopify/flash-list to render the app list.
- Animated API from react-native to handle the animations
- `snapToOffset` handles the initial scroll to the left of the items, then the normal scroll is enabled
