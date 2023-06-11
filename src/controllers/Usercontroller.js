import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export default {
  async createUser(req, res) {
    try {
      console.log("Creating user...");

      const { name, email, numero } = req.body;
      console.log("Received data:", name, email, numero);

      const parsedNumero = BigInt(numero);


      const user = await prisma.user.create({
        data: {
          name,
          email,
          numero: parsedNumero,
        },
      });

      // Converter o número BigInt em uma string
      user.numero = user.numero.toString();

      return res.json(user);
    } catch (error) {
      console.error("Error:", error);
      return res.status(400).json(error);
    }
  },

  async findAllUsers(req, res) {
    try {
      const users = await prisma.user.findMany();

      // Converter o número BigInt em uma string para ser serializado corretamente
      const usersSerialized = users.map(user => ({
        ...user,
        numero: user.numero.toString(),
      }));

      return res.json(usersSerialized);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  async findUser(req, res) {
    try {
      const { id } = req.params;

      const user = await prisma.user.findUnique({ where: { id: Number(id) } });

      // Verificar se o usuário foi encontrado
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      // Converter o número BigInt em uma string
      user.numero = user.numero.toString();

      return res.json(user);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async findUpdateUser(req, res) {
    try {
      const { id } = req.params;
      const { name, email, numero } = req.body;
      const parsedNumero = BigInt(numero);
      let user = await prisma.user.findUnique({ where: { id: Number(id) } });

      // Verificar se o usuário foi encontrado
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      // Converter o número BigInt em uma string

      user = await prisma.user.update(
        {
          where: {id: Number(id) },
          data: {
            name,
            email,
            numero: parsedNumero
          }
        })
      user.numero = user.numero.toString();
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async findDeleteUser(req, res) {
    try {
      const { id } = req.params;
     
      let user = await prisma.user.findUnique({ where: { id: Number(id) } });

      // Verificar se o usuário foi encontrado
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      // Converter o número BigInt em uma string

      user = await prisma.user.delete(
        {
          where: {id: Number(id) }
        })
     
      return res.json({message: 'Usuario deletado'});
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }


};

