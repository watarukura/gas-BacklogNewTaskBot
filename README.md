# gas-BacklogNewTaskBot

Backlog.jpのwebhookを受けてSlackに通知するBot。

## 準備

1. GASのメニューから「公開」→「Webアプリケーションとして導入」を選択。「現在のウェブ アプリケーションの URL」をコピーしておく
2.　Backlog.jpのプロジェクト設定→Webhook→Webhookを追加するを選択、Webhook URLに1.でコピーしたURLを貼り付けし、「課題の追加」にチェックを入れる
3. GASにSlackAppをインストールする [link](https://qiita.com/soundTricker/items/43267609a870fc9c7453)
4. SlackのAPIトークンをGASの「ファイル」→「プロジェクトのプロパティ」→「スクリプトのプロパティ」にプロパティ名:token、値:APIトークンの値で指定する
使ったことないけどOAuth対応の新しいAPIトークン使うほうがセキュア。
5. SlackのIncoming Webhookを設定する。Webhook URLをコピーして、GASのコードを置き換え。
6. 利用しているBacklog.jpのURLでGASのコードを置き換え。通知したいSlackチャンネルも同様に置き換え。
7. (option):backlog:で呼び出せるSlack emojiを登録しておく
