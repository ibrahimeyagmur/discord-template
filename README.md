# Discord Bot Altyapısı (TypeScript · discord.js v14)

Modüler, ölçeklenebilir ve TypeScript tabanlı Discord bot altyapısı. Prefix ve Slash komutları, otomatik komut/event yükleme ve kolay konfigürasyon desteği sunar.

## Özellikler
- Prefix ve Slash komut desteği
- Otomatik komut ve event yükleme
- Tip güvenliği (TypeScript) ve açık arayüzler
- Hata yakalama ve kullanıcıya dost geri bildirimler
- Kolay yapılandırma `.env` üzerinden

## Klasör Yapısı
```
src/
├── commands/
│   ├── app/          # Slash komutlar
│   └── command/      # Prefix komutlar
├── events/           # Event handler'lar
├── structures/       # Bot yapıları (özel Client)
├── types/            # TypeScript tipleri ve arayüzler
├── config.ts         # Konfigürasyon (dotenv)
└── index.ts          # Giriş noktası
```

## Mimari
- `BotClient` (`src/structures/Client.ts`):
  - Komut ve event dosyalarını dinamik olarak yükler.
  - `prefixCommands` ve `slashCommands` koleksiyonlarını yönetir.
  - `registerSlashCommands()` ile slash komutlarını Discord’a kaydeder.
- Eventler (`src/events/*`):
  - Handler imzası `execute(client, ...args)` şeklindedir ve `client` ilk parametre olarak geçirilir.
  - Örnekler: `MessageCreate`, `InteractionCreate`, `ClientReady`.
- Komutlar:
  - Prefix: `src/commands/command/*` altında, `PrefixCommand` arayüzünü uygular.
  - Slash: `src/commands/app/*` altında, `SlashCommand` arayüzünü uygular ve `SlashCommandBuilder` kullanır.
- Tipler (`src/types/index.ts`): Komut arayüzleri ve Discord etkileşim tipleri.
- Konfigürasyon (`src/config.ts`): `.env` değişkenlerini okur ve `token`, `prefix`, `clientId`, `guildId` sağlar.

## Kurulum
1. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```
2. `.env` dosyasını oluşturun ve doldurun:
   ```env
   TOKEN=discord_bot_tokeniniz
   PREFIX=!
   CLIENT_ID=discord_uygulama_id
   GUILD_ID=opsiyonel_guild_id   # yalnızca guild’e özel slash komutlar için
   ```

## Geliştirme ve Çalıştırma
- Derleme:
  ```bash
  npm run build
  ```
- Prod başlatma:
  ```bash
  npm start
  ```
- Geliştirme modu (hot-reload):
  ```bash
  npm run dev
  ```

## Komut Ekleme
- Prefix komut örneği (`src/commands/command/ping.ts`):
  ```ts
  import { Message } from "discord.js";
  import { PrefixCommand } from "../../types";

  export default {
    name: "ping",
    description: "Botun gecikme süresini gösterir",
    aliases: ["p", "latency"],
    usage: "ping",
    async execute(message: Message, args: string[]) {
      message.reply("Komut çalıştı!");
    },
  } as PrefixCommand;
  ```
- Slash komut örneği (`src/commands/app/ping.ts`):
  ```ts
  import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";
  import { SlashCommand } from "../../types";

  export default {
    data: new SlashCommandBuilder()
      .setName("ping")
      .setDescription("Botun gecikme süresini gösterir"),
    async execute(interaction: ChatInputCommandInteraction) {
      await interaction.reply("Komut çalıştı!");
    },
  } as SlashCommand;
  ```

## Event Ekleme
`src/events/` altında yeni bir dosya oluşturun:
```ts
import { Events } from "discord.js";
import { BotClient } from "../structures/Client";

export default {
  name: Events.MessageCreate,
  execute(client: BotClient, /* payload */) {
    // handler
  },
};
```

## Sorun Giderme
- `.env` dosyasındaki `TOKEN` geçersizse giriş başarısız olur. Token’ı kontrol edin.
- Slash komutlar görünmüyorsa `CLIENT_ID`/`GUILD_ID` değerlerini ve `registerSlashCommands()` çağrısını doğrulayın.
- Prefix komut çağrıları `PREFIX` ile başlamalıdır. Örn: `!ping`.
- Event handler imzaları `execute(client, ...args)` şeklinde olmalıdır; aksi halde payload eksik olabilir.

## Lisans
Bu proje `LGPL-3.0-or-later` lisansı ile lisanslanmıştır. Ayrıntılar için `package.json`’a bakabilirsiniz.

## İletişim ve Sosyal Medya
- Instagram: [@ibrahim.e.yagmur](https://instagram.com/ibrahim.e.yagmur)
- Mail: [ibrahim.e.yagmur@gmail.com](mailto:ibrahim.e.yagmur@gmail.com)
- Firma Web Sitesi: [www.pulkadot.com](https://www.pulkadot.com)
