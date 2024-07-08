// Importando as dependências do React e componentes do React Native
import React, { useState, useRef } from "react";
import {
  View, // Componente de layout que organiza outros componentes
  Text, // Componente para exibir texto
  TextInput, // Componente para entrada de texto
  TouchableOpacity, // Componente para criar botões tocáveis
  StyleSheet, // Objeto para criar estilos
  SafeAreaView, // Componente para garantir que o conteúdo não invada áreas como a barra de status
  Keyboard, // API para gerenciar o teclado
} from "react-native";

// Importando a instância do axios criada anteriormente
import api from "./src/services/api";

export default function App() {
  // Definindo estados usando o hook useState
  const [cep, setCep] = useState(""); // Estado para armazenar o CEP digitado
  const inputRef = useRef(null); // Referência para o input, usada para focar ou limpar o campo de texto
  const [cepUser, setCepUser] = useState(null); // Estado para armazenar os dados do CEP obtidos da API

  // Função assíncrona para buscar os dados do CEP na API
  async function buscar() {
    if (cep == "") {
      alert("Digite um CEP valido"); // Alerta caso o campo CEP esteja vazio
      setCep(""); // Reseta o campo CEP
      return;
    }

    try {
      const response = await api.get(`/${cep}/json`); // Fazendo a requisição para a API com o CEP fornecido
      //console.log(response.data)
      setCepUser(response.data); // Armazenando os dados do CEP no estado
      Keyboard.dismiss(); // Fechando o teclado após a busca
    } catch (error) {
      console.log("ERROR:" + error); // Exibindo o erro no console
    }
  }

  // Função para limpar os campos e focar no input novamente
  function limpar() {
    setCep(''); // Reseta o campo CEP
    inputRef.current.focus(); // Foca novamente no campo de texto para nova entrada
    setCepUser(null); // Reseta os dados do usuário
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.text}> Digite o CEP desejado</Text>
        <TextInput
          style={styles.input}
          placeholder="EX: 59040240" // Texto de exemplo no campo de texto
          value={cep} // Valor do campo de texto é vinculado ao estado cep
          onChangeText={(texto) => setCep(texto)} // Atualiza o estado do CEP quando o texto muda
          keyboardType="numeric" // Definindo o teclado numérico
          ref={inputRef} // Referência para o input, usada para focar ou limpar o campo
        />
      </View>

      <View style={styles.areaBtn}>
        <TouchableOpacity
          style={[styles.botao, { backgroundColor: "#1d75cd" }]}
          onPress={buscar} // Chamando a função buscar ao clicar no botão
        >
          <Text style={styles.botaoText}>Buscar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botao, { backgroundColor: "#cd3e1d" }]}
          onPress={limpar} // Chamando a função limpar ao clicar no botão
        >
          <Text style={styles.botaoText}>Limpar</Text>
        </TouchableOpacity>
      </View>

      {cepUser && ( // Renderizando os dados do CEP apenas se cepUser não for null
        <View style={styles.Resultado}>
          <Text style={styles.itemText}>CEP: {cepUser.cep}</Text>
          <Text style={styles.itemText}>Logradouro: {cepUser.logradouro}</Text>
          <Text style={styles.itemText}>Bairro: {cepUser.bairro}</Text>
          <Text style={styles.itemText}>Cidade: {cepUser.localidade}</Text>
          <Text style={styles.itemText}>Estado: {cepUser.uf}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

// Definindo os estilos dos componentes
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Cor de fundo da tela
    padding: 20, // Espaçamento interno ao redor do conteúdo
  },
  text: {
    marginTop: 25,
    marginBottom: 15,
    fontSize: 25,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    width: "90%",
    padding: 10,
    fontSize: 18,
  },
  areaBtn: {
    alignItems: "center",
    flexDirection: "row", // Disposição dos botões em linha
    marginTop: 15,
    justifyContent: "space-around", // Distribui os botões igualmente
  },
  botao: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
  },
  botaoText: {
    fontSize: 22,
    color: "#fff",
  },
  Resultado: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20, // Espaçamento superior
  },
  itemText: {
    fontSize: 22,
    color: "#333", // Cor do texto
    marginBottom: 10, // Espaçamento inferior
  },
});
