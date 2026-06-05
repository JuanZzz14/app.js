import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Switch,
  SafeAreaView,
} from 'react-native';

const C = {
  bg: '#0F0F13',
  card: '#1A1A22',
  accent: '#7C5CFC',
  accentLight: '#A98BFD',
  text: '#F0EEF8',
  muted: '#6B6880',
  border: '#2A2835',
};

function HomeScreen({ navigate }) {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.center}>
      <Text style={styles.bigTitle}>Ola!</Text>
      <Text style={styles.subtitle}>Bem-vindo ao meu app</Text>
      <View style={styles.cardGrid}>
        {[
          { label: 'Lista', screen: 'Lista' },
          { label: 'Formulario', screen: 'Formulario' },
          { label: 'Config', screen: 'Config' },
          { label: 'Sobre', screen: 'Sobre' },
        ].map((item) => (
          <TouchableOpacity
            key={item.screen}
            style={styles.card}
            onPress={() => navigate(item.screen)}
          >
            <Text style={styles.cardText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const ITEMS = [
  { id: 1, title: 'Aprender React Native', done: true },
  { id: 2, title: 'Criar um app no Expo', done: true },
  { id: 3, title: 'Publicar na loja', done: false },
  { id: 4, title: 'Conseguir 1000 usuarios', done: false },
  { id: 5, title: 'Monetizar o app', done: false },
];

function ListaScreen() {
  const [items, setItems] = useState(ITEMS);

  const toggle = (id) =>
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, done: !i.done } : i))
    );

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.padded}>
      <Text style={styles.pageTitle}>Minha Lista</Text>
      {items.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.listItem}
          onPress={() => toggle(item.id)}
        >
          <View style={[styles.checkbox, item.done && styles.checkboxDone]} />
          <Text
            style={[
              styles.listText,
              item.done && { textDecorationLine: 'line-through', color: C.muted },
            ]}
          >
            {item.title}
          </Text>
        </TouchableOpacity>
      ))}
      <Text style={styles.hint}>Toque para marcar como feito</Text>
    </ScrollView>
  );
}

function FormularioScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const submit = () => {
    if (name && email) setSubmitted(true);
  };

  if (submitted) {
    return (
      <View style={[styles.screen, styles.center]}>
        <Text style={styles.pageTitle}>Enviado!</Text>
        <Text style={styles.subtitle}>Ola, {name}!</Text>
        <TouchableOpacity
          style={[styles.btn, { marginTop: 24 }]}
          onPress={() => { setSubmitted(false); setName(''); setEmail(''); }}
        >
          <Text style={styles.btnText}>Novo envio</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.padded}>
      <Text style={styles.pageTitle}>Formulario</Text>
      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        placeholder="Seu nome..."
        placeholderTextColor={C.muted}
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.label}>E-mail</Text>
      <TextInput
        style={styles.input}
        placeholder="seu@email.com"
        placeholderTextColor={C.muted}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity
        style={[styles.btn, (!name || !email) && styles.btnDisabled]}
        onPress={submit}
        disabled={!name || !email}
      >
        <Text style={styles.btnText}>Enviar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function ConfigScreen() {
  const [notif, setNotif] = useState(true);
  const [dark, setDark] = useState(true);
  const [sound, setSound] = useState(false);

  const Row = ({ label, value, onToggle }) => (
    <View style={styles.configRow}>
      <Text style={styles.listText}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: C.border, true: C.accent }}
        thumbColor={value ? C.accentLight : C.muted}
      />
    </View>
  );

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.padded}>
      <Text style={styles.pageTitle}>Configuracoes</Text>
      <View style={styles.card2}>
        <Row label="Notificacoes" value={notif} onToggle={setNotif} />
        <Row label="Modo escuro" value={dark} onToggle={setDark} />
        <Row label="Sons" value={sound} onToggle={setSound} />
      </View>
      <TouchableOpacity style={[styles.btn, { backgroundColor: '#3A1A1A', marginTop: 32 }]}>
        <Text style={[styles.btnText, { color: '#F87171' }]}>Limpar dados</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function SobreScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.padded}>
      <Text style={styles.pageTitle}>Sobre</Text>
      <View style={styles.card2}>
        <Text style={styles.label}>Versao</Text>
        <Text style={styles.infoValue}>1.0.0</Text>
        <Text style={styles.label}>Desenvolvido com</Text>
        <Text style={styles.infoValue}>React Native + Expo</Text>
        <Text style={styles.label}>Autor</Text>
        <Text style={styles.infoValue}>Juan Victor</Text>
      </View>
    </ScrollView>
  );
}

const SCREENS = {
  Home: HomeScreen,
  Lista: ListaScreen,
  Formulario: FormularioScreen,
  Config: ConfigScreen,
  Sobre: SobreScreen,
};

const TABS = ['Home', 'Lista', 'Formulario', 'Config', 'Sobre'];

export default function App() {
  const [current, setCurrent] = useState('Home');
  const Screen = SCREENS[current];

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        {current !== 'Home' && (
          <TouchableOpacity onPress={() => setCurrent('Home')} style={styles.backBtn}>
            <Text style={{ color: C.accentLight, fontSize: 16 }}>Inicio</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.headerTitle}>{current === 'Home' ? 'Flowk' : current}</Text>
      </View>

      <View style={{ flex: 1 }}>
        <Screen navigate={setCurrent} />
      </View>

      <View style={styles.tabBar}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={styles.tab}
            onPress={() => setCurrent(tab)}
          >
            <Text style={[styles.tabLabel, current === tab && { color: C.accentLight }]}>
              {tab}
            </Text>
            {current === tab && <View style={styles.tabDot} />}
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },

  header: {
    backgroundColor: C.card,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: { color: C.text, fontSize: 18, fontWeight: '700', marginLeft: 8 },
  backBtn: { marginRight: 8 },

  screen: { flex: 1, backgroundColor: C.bg },
  center: { flexGrow: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  padded: { padding: 20 },

  bigTitle: { fontSize: 40, fontWeight: '800', color: C.text, marginBottom: 6 },
  subtitle: { fontSize: 16, color: C.muted, marginBottom: 32 },
  pageTitle: { fontSize: 24, fontWeight: '700', color: C.text, marginBottom: 20 },

  cardGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'center' },
  card: {
    width: 140,
    height: 90,
    backgroundColor: C.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: C.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: { color: C.text, fontSize: 15, fontWeight: '600' },

  card2: {
    backgroundColor: C.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: C.border,
    padding: 16,
  },

  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
    gap: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: C.muted,
  },
  checkboxDone: {
    backgroundColor: C.accent,
    borderColor: C.accent,
  },
  listText: { color: C.text, fontSize: 15, flex: 1 },
  hint: { color: C.muted, fontSize: 13, marginTop: 16 },

  label: {
    color: C.muted,
    fontSize: 13,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 12,
    padding: 14,
    color: C.text,
    fontSize: 15,
    marginBottom: 4,
  },
  btn: {
    backgroundColor: C.accent,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  btnDisabled: { opacity: 0.4 },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 15 },

  configRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },

  infoValue: { color: C.accentLight, fontSize: 16, fontWeight: '600', marginBottom: 4 },

  tabBar: {
    flexDirection: 'row',
    backgroundColor: C.card,
    borderTopWidth: 1,
    borderTopColor: C.border,
    paddingBottom: 4,
  },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 8 },
  tabLabel: { color: C.muted, fontSize: 10, marginTop: 2 },
  tabDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: C.accent,
    marginTop: 3,
  },
});