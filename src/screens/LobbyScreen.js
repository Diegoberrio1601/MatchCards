import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Footer } from "../components/Footer";

const { width, height } = Dimensions.get("window");

export const LobbyScreen = () => {
  const navigation = useNavigation();

  const leftColumn = ["M", "A", "T", "C", "H"].reverse();
  const rightColumn = ["C", "A", "R", "D", "S"].reverse();

  // Inicializamos las animaciones con un valor de 0 (posición inicial)
  const leftAnimations = leftColumn.map(
    () => useRef(new Animated.Value(0)).current
  );
  const rightAnimations = rightColumn.map(
    () => useRef(new Animated.Value(0)).current
  );

  useEffect(() => {
    // Animamos las letras para que roten hacia la izquierda
    const animations = [
      ...leftAnimations.map((anim, index) =>
        Animated.timing(anim, {
          toValue: 1, // Valor final de la animación (1 para la interpolación)
          duration: 700,
          delay: index * 100,
          useNativeDriver: true,
        })
      ),
      ...rightAnimations.map((anim, index) =>
        Animated.timing(anim, {
          toValue: 1, // Valor final de la animación (1 para la interpolación)
          duration: 700,
          delay: index * 100,
          useNativeDriver: true,
        })
      ),
    ];

    // Iniciamos las animaciones
    Animated.stagger(100, animations).start();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        {/* Columna izquierda */}
        <View style={styles.column}>
          {leftColumn.map((letter, index) => (
            <Animated.View
              key={index}
              style={[
                styles.letterContainer,
                {
                  transform: [
                    {
                      rotateZ: leftAnimations[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: ["0deg", "-90deg"], // Rotación de 0 a -45 grados
                      }),
                    },
                  ],
                },
              ]}
            >
              <Text style={styles.letter}>{letter}</Text>
            </Animated.View>
          ))}
        </View>

        {/* Columna derecha */}
        <View style={styles.column}>
          {rightColumn.map((letter, index) => (
            <Animated.View
              key={index}
              style={[
                styles.letterContainer,
                {
                  transform: [
                    {
                      rotateZ: rightAnimations[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: ["0deg", "-90deg"], // Rotación de 0 a -45 grados
                      }),
                    },
                  ],
                },
              ]}
            >
              <Text style={styles.letter}>{letter}</Text>
            </Animated.View>
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Game")}
      >
        <Text style={styles.buttonText}>New Game</Text>
      </TouchableOpacity>

      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  titleContainer: {
    flexDirection: "row",
    width: width * 0.9,
    height: height * 0.8,
    justifyContent: "space-between",
  },
  column: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    flex: 1,
  },
  letterContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    height: 150,
  },
  letter: {
    color: "#C5B3F9",
    fontFamily: "RevRegular",
    fontSize: 180,
    textTransform: "uppercase",
    lineHeight: 180,
  },
  button: {
    backgroundColor: "#F7DF63",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 10,
    width: "100%",
  },
  buttonText: {
    color: "#170801",
    fontSize: 21,
    fontFamily: "RevSemiBold",
    textAlign: "center",
  },
});
