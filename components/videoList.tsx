import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    FlatList,
    Image,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { WebView } from "react-native-webview";

// ✅ Remplace SafeAreaView par useSafeAreaInsets
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { videosTchad } from "../constants/videosTchad";

const VideoNewsScreen = () => {
  const [selectedVideo, setSelectedVideo] = React.useState<string | null>(null);

  // Récupère les insets (zones sécurisées : notch, barre de navigation)
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <FlatList
        data={videosTchad}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.videoCard}>
            {/* Thumbnail cliquable */}
            <TouchableOpacity
              onPress={() => setSelectedVideo(item.videoId)}
              activeOpacity={0.8}
            >
              <Image
                source={{
                  uri: `https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`, // ✅ ESPACES SUPPRIMÉS
                }}
                style={styles.thumbnail}
                resizeMode="cover"
              />
            </TouchableOpacity>

            <View style={styles.flexFavorite}>
              <Text style={styles.title}>{item.title}</Text>
              <TouchableOpacity
                onPress={() => {}} // À remplacer plus tard si besoin
                style={styles.backButton}
              >
                <Ionicons name="bookmark-outline" color="#000" size={22} />
              </TouchableOpacity>
            </View>

            <Text style={styles.source}>
              {item.source} -{" "}
              {new Date(item.publishedAt).toLocaleDateString("fr-FR")}
            </Text>
            <Text style={styles.description} numberOfLines={3}>
              {item.description}
            </Text>
          </View>
        )}
      />

      {/* MODAL PLEIN ÉCRAN — VERSION DÉFINITIVE CORRIGÉE */}
      <Modal
        visible={!!selectedVideo}
        animationType="slide"
        onRequestClose={() => setSelectedVideo(null)}
        transparent={false}
      >
        <View style={{ flex: 1, backgroundColor: "#000" }}>
          {/* Bouton Fermer — FIXÉ en haut, toujours visible */}
          <TouchableOpacity
            style={styles.closeButtonOverlay}
            onPress={() => setSelectedVideo(null)}
            activeOpacity={0.7}
          >
            <View style={styles.closeButtonContainer}>
              <Text style={styles.closeButtonText}>✕ Fermer</Text>
            </View>
          </TouchableOpacity>

          {/* WebView — prend tout l’espace restant */}
          {selectedVideo && (
            <WebView
              source={{
                uri: `https://www.youtube.com/embed/${selectedVideo}?autoplay=1&modestbranding=1&rel=0&controls=1`, // ✅ ESPACES SUPPRIMÉS
              }}
              style={{ flex: 1 }}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              allowsInlineMediaPlayback={true}
              mediaPlaybackRequiresUserAction={false}
              scalesPageToFit={true}
              startInLoadingState={true}
              showsVerticalScrollIndicator={false}
              originWhitelist={["*"]}
            />
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f5f5",
    marginBottom: 50,
  },
  videoCard: {
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  thumbnail: {
    width: "100%",
    height: 180,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
    color: "#333",
    lineHeight: 20,
  },
  source: {
    fontSize: 12,
    color: "#777",
    marginVertical: 4,
  },
  description: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
    marginTop: 6,
  },

  /* ———— MODAL STYLE ———— */
  closeButtonOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    zIndex: 9999,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  closeButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: "rgba(255, 59, 48, 0.9)",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  closeButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },

  flexFavorite: {
    flexDirection: "row",
    justifyContent: "space-between", // ← Changé de center à space-between
    paddingVertical: 10,
    gap: 10,
    marginRight: 50
  },
  backButton: {
    top: 10,
    width: 40,
    height: 40,
    backgroundColor: "#00000030",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default VideoNewsScreen;