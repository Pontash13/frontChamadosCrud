import os
import platform
from notion.client import NotionClient

'''
função que retorna todos os arquivos txt em um dicionario, 
onde a chave é o nome e valor o conteúdo do texto
'''
def arquivos_txt():
	#pasta atual
	pasta = os.getcwd()
	dicionario = {}

	#todos os arquivos que estão na pasta e são .txt
	caminhos = [os.path.join(pasta, nome) for nome in os.listdir(pasta)]
	arquivos = [arq for arq in caminhos if os.path.isfile(arq)]
	txt = [arq for arq in arquivos if arq.lower().endswith(".txt")]

	for item in txt:
		nome = item.split(pasta)[1].split(".txt")[0].split("\\")[1] #nome do arquivo sem .txt e sem barra
		arq  = open(item).readlines() #o arquivo completo, valor dentro da lista é uma linha 
		dicionario[nome] = arq

	return dicionario

'''
Função de conexão com o Notion
'''
def conectar_notion(token):
	# Obtain the `token_v2` value by inspecting your browser cookies on a logged-in (non-guest) session on Notion.so
	client = NotionClient(token_v2 = token)


import os
for line in os.popen('systeminfo'): 
	print(line.rstrip())