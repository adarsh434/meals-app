import {useContext} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import MealItem from '../components/MealItem';
import {MEALS} from '../data/dummy-data';
import {FavouritesContext} from '../store/context/favourites-context';

function FavoritesScreen() {
  // const FavouriteMealsCtx = useContext(FavouritesContext);
  const FavouriteMealsIds = useSelector(state => state.favouriteMeals.ids);

  const favouriteMeals = MEALS.filter(meal =>
    FavouriteMealsIds.includes(meal.id),
  );

  function renderMealItem(itemData) {
    const item = itemData.item;

    const mealItemProps = {
      id: item.id,
      title: item.title,
      imageUrl: item.imageUrl,
      affordability: item.affordability,
      complexity: item.complexity,
      duration: item.duration,
    };
    return <MealItem {...mealItemProps} />;
  }
  if (favouriteMeals.length === 0) {
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.text}>{'You have no favourite meal.'}</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={favouriteMeals}
        keyExtractor={item => item.id}
        renderItem={renderMealItem}
      />
    </View>
  );
}

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});
