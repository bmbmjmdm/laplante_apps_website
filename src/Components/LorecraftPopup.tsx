import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ActivityIndicator,
  Animated,
  Easing,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { StyledText } from "./Text";
import { ThemeContext } from "../Theme";
import { isScreenSmall } from "../Helpers";

type LorecraftPopupProps = {
  visible: boolean;
  onClose?: () => void;
  onSubmit?: (email: string) => void;
  loading?: boolean;
  description?: string;
  submitLabel?: string;
  placeholder?: string;
  defaultEmail?: string;
  accentColor?: string;
};

export const LorecraftPopup: FunctionComponent<LorecraftPopupProps> = ({
  visible,
  onClose,
  onSubmit,
  loading = false,
  description = "We'll email you when the Kickstarter is open!",
  submitLabel = "Join Waitlist",
  placeholder = "you@email.com",
  defaultEmail = "",
  accentColor = "#5B80A0",
}) => {
  const theme = useContext(ThemeContext);
  const smallScreen = isScreenSmall();
  const [email, setEmail] = useState(defaultEmail);
  const [error, setError] = useState<string | null>(null);
  const [shouldRender, setShouldRender] = useState(visible);
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const cardScale = useRef(new Animated.Value(0.92)).current;
  const cardTranslateY = useRef(new Animated.Value(40)).current;
  const cardOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
      setEmail(defaultEmail);
      setError(null);
      overlayOpacity.stopAnimation();
      cardScale.stopAnimation();
      cardTranslateY.stopAnimation();
      cardOpacity.stopAnimation();
      overlayOpacity.setValue(0);
      cardScale.setValue(0.92);
      cardTranslateY.setValue(40);
      cardOpacity.setValue(0);
      Animated.parallel([
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 260,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.spring(cardScale, {
          toValue: 1,
          useNativeDriver: true,
          friction: 6,
          tension: 75,
        }),
        Animated.spring(cardTranslateY, {
          toValue: 0,
          useNativeDriver: true,
          friction: 6,
          tension: 120,
        }),
        Animated.timing(cardOpacity, {
          toValue: 1,
          duration: 280,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    } else if (shouldRender) {
      Animated.parallel([
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 180,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(cardScale, {
          toValue: 0.92,
          duration: 180,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(cardTranslateY, {
          toValue: 40,
          duration: 180,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(cardOpacity, {
          toValue: 0,
          duration: 140,
          easing: Easing.in(Easing.linear),
          useNativeDriver: true,
        }),
      ]).start(({ finished }) => {
        if (finished && !visible) {
          setShouldRender(false);
          overlayOpacity.setValue(0);
          cardOpacity.setValue(0);
          cardTranslateY.setValue(40);
          cardScale.setValue(0.92);
        }
      });
    }
  }, [visible, shouldRender, defaultEmail, overlayOpacity, cardScale, cardTranslateY, cardOpacity]);

  const handleOverlayPress = () => {
    if (onClose) onClose();
  };

  const handleSubmit = () => {
    const trimmed = email.trim();
    if (!trimmed) {
      setError("Email required");
      return;
    }

    const emailRegex = /[^@\s]+@[^@\s]+\.[^@\s]+/;
    if (!emailRegex.test(trimmed)) {
      setError("Enter a valid email");
      return;
    }

    setError(null);
    onSubmit?.(trimmed);
  };

  return (
    <Modal
      transparent
      visible={shouldRender}
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.modalRoot}>
        <TouchableWithoutFeedback onPress={handleOverlayPress}>
          <Animated.View
            style={[styles.backdrop, { opacity: overlayOpacity }]}
          />
        </TouchableWithoutFeedback>
        <Animated.View
          style={[
            styles.card,
            {
              opacity: cardOpacity,
              transform: [{ scale: cardScale }, { translateY: cardTranslateY }],
              borderColor: accentColor,
              shadowColor: accentColor,
              width: smallScreen ? "90%" : 460,
            },
          ]}
        >
          {onClose && (
            <TouchableOpacity
              accessibilityLabel="Close waitlist popup"
              onPress={onClose}
              style={styles.closeButton}
            >
              <StyledText type="button">x</StyledText>
            </TouchableOpacity>
          )}
          <StyledText
            type="caption"
            style={{
              marginTop: 12,
              textAlign: "left",
              color: theme.text.color,
              textShadowColor: "#0A1F33",
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 6,
            }}
          >
            {description}
          </StyledText>
          <TextInput
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
            placeholder={placeholder}
            placeholderTextColor="rgba(255,255,255,0.5)"
            value={email}
            onChangeText={setEmail}
            style={[
              styles.input,
              {
                borderColor: accentColor,
                color: theme.text.color,
              },
            ]}
          />
          {error && (
            <StyledText type="subscript" style={styles.error}>
              {error}
            </StyledText>
          )}
          <TouchableOpacity
            onPress={handleSubmit}
            activeOpacity={0.85}
            style={[
              styles.button,
              { backgroundColor: accentColor },
              loading && styles.buttonDisabled,
            ]}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#071221" />
            ) : (
              <StyledText type="button" style={styles.buttonLabel}>
                {submitLabel}
              </StyledText>
            )}
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalRoot: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(1, 5, 12, 0.85)",
  },
  card: {
    backgroundColor: "rgba(5, 14, 32, 0.95)",
    borderRadius: 28,
    borderWidth: 2,
    paddingVertical: 32,
    paddingHorizontal: 28,
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 20 },
    shadowRadius: 30,
    elevation: 12,
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    padding: 8,
  },
  input: {
    marginTop: 16,
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: 12,
    paddingHorizontal: 24,
    fontSize: 16,
    backgroundColor: "rgba(2, 8, 18, 0.8)",
  },
  error: {
    color: "#EF4444",
    marginTop: 6,
  },
  button: {
    marginTop: 20,
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonLabel: {
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});
