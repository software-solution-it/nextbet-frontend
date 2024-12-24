import React from "react";

const PromotionPage = ({ onPromotionClick }) => {
    const promotions = [
        {
          id: 1,
          details: "Primeiro depósito + 50% bônus",
          details_info:
            "A fim de agradecer a sua confiança e apoio no BetFiery, seu primeiro valor de depósito bem-sucedido de mais de R$100, o NextBet lhe dará um bônus grátis de 50% do valor do depósito, sinceramente, desejo você ganhar mais! Uma vez feito seu depósito, o bônus será automaticamente creditado em sua conta. Verifique no sistema as mensagens enviadas a você.",
          date: "Começou às 2024-04-15",
          status: "Em curso",
          image: "https://static.betfiery5.com/1716294916711879793_h5activity50.jpg",
          badge: "HOT",
          requisitos: [
            { requisito: "50 ≤ Quantia < 100", bonus: "10% De Bônus" },
            { requisito: "100 ≤ Quantia ≤ 20000", bonus: "50% De Bônus" },
          ],
          regras: [
            "Só o primeiro pedido com um valor de depósito de R$50 ou superior pode participar neste evento, e este evento só pode participar uma vez.",
            "O bônus máximo para esta campanha é 800BRL. Não é possível participar ao mesmo tempo em outras promoções.",
            "Condições de retirada: o valor da aposta efetiva é igual ou superior a 20 vezes ou mais da soma do valor do depósito e do valor do bônus. Apostas de cassino ao vivo não contam para as condições de retirada.",
            "Depois de concluir o depósito, enviar a inscrição no centro pessoal da promoção, você vai receber bônus da sorte do NextBet e os bônus poderão ser jogados e retirados!",
            "Certifique-se de que o seu nome, detalhes de contato e CPF são exatos e únicos. Se o mesmo jogador utilizar diferentes IPs de rede para registrar múltiplas contas para reclamar o prêmio, isto será considerado batota e sua conta será permanentemente congelada.",
          ],
        },
        {
          id: 2,
          details: "Depósito APP + 15% bônus",
          details_info:
            "Ofereça aos usuários do aplicativo descontos de recarga super altos para ajudá-lo a iniciar sua jornada para a riqueza com o Betfiery!",
          date: "Começou às 2024-04-15",
          status: "Em curso",
          image: "https://static.betfiery5.com/1716294929449882479_h5activity15.jpg",
          badge: "exclusive",
          requisitos: [
            { requisito: "50 ≤ Quantia ＜ 100", bonus: "4% De Bônus" },
            { requisito: "100 ≤ Quantia ≤ 20000", bonus: "15% De Bônus" },
          ],
          regras: [
            "Somente pedidos com valor de depósito igual ou superior a R$ 50 poderão participar deste evento, e este evento só poderá ser participado uma vez por dia.",
            "O prêmio máximo para este evento é de R$ 800. Somente usuários do aplicativo podem participar e não podem participar de outras promoções ao mesmo tempo.",
            "Condições de retirada: o valor da aposta efetiva é igual ou superior a 10 vezes ou mais da soma do valor do depósito e do valor do bonus.",
            "Depois de concluir o depósito, enviar a inscrição no centro pessoal da promoção, você vai receber bônus da sorte do NextBet e os bônus poderão ser jogados e retirado！",
            "Certifique-se de que o seu nome, detalhes de contacto e CPF são exactos e únicos. Se o mesmo jogador utilizar diferentes IPs de rede para registar múltiplas contas para reclamar o prémio, isto será considerado batota e a sua conta será permanentemente congelada.",
          ],
        },
        {
          id: 3,
          details: "Depósito diário + 10% bônus",
          details_info:
            "NextBet vai valorizar e esperar todos os dias com você! A partir de agora, você tem 3 chances de obter mais bônus todos os dias.Contanto que o valor do depósito seja maior ou igual a R$200, você vai receber um adicional de 10% do valor do depósito grátis NextBet gratuitamente como bonus! Sinceramente, desejo voce ganhar mais!",
          requisitos: [
            { requisito: "50 ≤ Quantia < 100", bonus: "5% De Bônus" },
            { requisito: "100 ≤ Quantia ≤ 20000", bonus: "10% De Bônus" },
          ],
          regras: [
            "Apenas os primeiros 3 pedidos com um depósito maior ou igual a R$200 podem participar do evento",
            "Condições de retirada: o valor da aposta efetiva é igual ou superior a 10 vezes ou mais da soma do valor do depósito e do valor do bonus. Apostas de cassino ao vivo não conta para as condições de retirada",
            "Certifique-se de que o seu nome, detalhes de contacto e CPF são exactos e únicos. Se o mesmo jogador utilizar diferentes IPs de rede para registar múltiplas contas para reclamar o prémio, isto será considerado batota e a sua conta será permanentemente congelada.",
          ],
          date: "Começou às 2024-04-15",
          status: "Em curso",
          image: "https://static.betfiery5.com/1716294940312358399_h5activity10.jpg",
        },
        {
          id: 4,
          details: "Primeiro depósito +6 bônus",
          details_info:
            "NextBet lhe dará um bônus gratuito de 6 Após completar seu depósito, o bônus será automaticamente creditado no saldo de sua conta e uma mensagem [Bonus Arrival] será enviada a você.",
          requisitos: [{ requisito: "50 ≤ Quantia < 20000", bonus: "R$ 6" }],
          regras: [
            "Este evento é limitado a uma participação. ",
            "NextBet lhe dará um bônus gratuito de 6 Após completar seu depósito, o bônus será automaticamente creditado no saldo de sua conta e uma mensagem [Bonus Arrival] será enviada a você.",
            "Após completar o depósito, envie o registro no centro de promoção pessoal, e você receberá o bônus lucky Betfiery, que pode ser jogado e retirado. ",
            "Certifique-se de que seu nome, informações de contato e CPF sejam precisos e exclusivos. Se o mesmo jogador usar diferentes IPs de rede para registrar várias contas e receber prêmios, isso será considerado trapaça e suas contas serão permanentemente congeladas. Não é possível participar ao mesmo tempo em outras promoções.",
          ],
          date: "Começou às 2024-04-15",
          status: "Em curso",
          image: "https://static.betfiery5.com/1716294951553438926_h5activity6.jpg",
        },
      ];

      return (
        <div className="bg-dark p-6">
          <div className="tabs flex space-x-4 mb-6">
            {["Todos", "Depósito", "Classificação", "Outro"].map((tab) => (
              <button
                key={tab}
                className="py-2 px-4 text-white rounded-lg font-bold hover:bg-blue-600 transition"
              >
                {tab}
              </button>
            ))}
          </div>
    
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {promotions.map((promo) => (
              <div
                key={promo.id}
                onClick={() => onPromotionClick(promo.id)} 
                className="relative rounded-lg overflow-hidden shadow-lg cursor-pointer group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={promo.image}
                    alt={promo.details}
                    className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                </div>
    
                {promo.badge && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {promo.badge}
                  </div>
                )}
    
                <div className="absolute bottom-0 left-0 w-full">
                  <div
                    className="absolute inset-0"
                    style={{
                      backdropFilter: "blur(4px)",
                    }}
                  />
                  <div className="absolute inset-0 bg-black opacity-10" />
                  <div className="relative p-4 text-white flex justify-between items-center">
                    <div>
                      <p className="text-sm ">{promo.details}</p>
                      <p className="text-xs text-gray-400">{promo.date}</p>
                    </div>
                    <span className="bg-gray-200 bg-opacity-20 text-xs font-bold px-4 py-2 rounded">
                      <span className="text-yellow-300">{promo.status}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
};

export default PromotionPage;
