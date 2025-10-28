import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

interface User {
  id: number;
  name: string;
  age: number;
  city: string;
  interests: string[];
  photo: string;
  bio: string;
}

interface Message {
  id: number;
  text: string;
  sender: 'me' | 'other';
  time: string;
}

const mockUsers: User[] = [
  {
    id: 1,
    name: 'Анна',
    age: 28,
    city: 'Москва',
    interests: ['Путешествия', 'Йога', 'Кино'],
    photo: 'https://cdn.poehali.dev/projects/15177953-07e8-48f6-a284-638501c25de6/files/56b09b6b-d284-4093-8edb-247b980f2407.jpg',
    bio: 'Люблю активный отдых и новые впечатления. Ищу интересного собеседника для совместных путешествий.'
  },
  {
    id: 2,
    name: 'Дмитрий',
    age: 32,
    city: 'Санкт-Петербург',
    interests: ['Музыка', 'Спорт', 'Кулинария'],
    photo: 'https://cdn.poehali.dev/projects/15177953-07e8-48f6-a284-638501c25de6/files/c00b0834-55f1-4204-8966-7c330e6602b2.jpg',
    bio: 'Музыкант и любитель готовить. Давайте создадим что-то прекрасное вместе!'
  },
  {
    id: 3,
    name: 'Елена',
    age: 26,
    city: 'Казань',
    interests: ['Искусство', 'Фотография', 'Книги'],
    photo: 'https://cdn.poehali.dev/projects/15177953-07e8-48f6-a284-638501c25de6/files/a662fb19-b0ca-425f-a97b-4e44090ff87b.jpg',
    bio: 'Фотограф-любитель и книжный червь. Ценю глубокие разговоры и искреннюю дружбу.'
  },
  {
    id: 4,
    name: 'Максим',
    age: 30,
    city: 'Москва',
    interests: ['IT', 'Походы', 'Настолки'],
    photo: 'https://cdn.poehali.dev/projects/15177953-07e8-48f6-a284-638501c25de6/files/56b09b6b-d284-4093-8edb-247b980f2407.jpg',
    bio: 'Разработчик днём, путешественник в душе. Ищу компанию для походов и игр.'
  },
  {
    id: 5,
    name: 'София',
    age: 25,
    city: 'Новосибирск',
    interests: ['Танцы', 'Мода', 'Психология'],
    photo: 'https://cdn.poehali.dev/projects/15177953-07e8-48f6-a284-638501c25de6/files/a662fb19-b0ca-425f-a97b-4e44090ff87b.jpg',
    bio: 'Танцую сальсу и изучаю психологию. Люблю веселые компании и долгие прогулки.'
  },
  {
    id: 6,
    name: 'Артём',
    age: 29,
    city: 'Екатеринбург',
    interests: ['Бизнес', 'Спорт', 'Авто'],
    photo: 'https://cdn.poehali.dev/projects/15177953-07e8-48f6-a284-638501c25de6/files/c00b0834-55f1-4204-8966-7c330e6602b2.jpg',
    bio: 'Предприниматель и автолюбитель. Ценю честность и открытость в отношениях.'
  }
];

const faqData = [
  {
    question: 'Как зарегистрироваться на платформе?',
    answer: 'Регистрация проста: нажмите кнопку "Войти", заполните базовую информацию о себе, загрузите фото и начните поиск интересных людей!'
  },
  {
    question: 'Безопасна ли платформа?',
    answer: 'Да, мы используем современные технологии шифрования данных. Все анкеты проходят модерацию, а личная информация надежно защищена.'
  },
  {
    question: 'Как работает поиск по параметрам?',
    answer: 'Используйте фильтры возраста, города и интересов чтобы найти людей, которые вам подходят. Система автоматически подберет наиболее совместимые анкеты.'
  },
  {
    question: 'Можно ли использовать платформу бесплатно?',
    answer: 'Базовый функционал платформы полностью бесплатен: просмотр анкет, отправка сообщений и поиск по фильтрам доступны всем пользователям.'
  }
];

export default function Index() {
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [currentChat, setCurrentChat] = useState<User | null>(null);
  const [ageFilter, setAgeFilter] = useState<string>('all');
  const [cityFilter, setCityFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Привет! Как дела?', sender: 'other', time: '14:30' },
    { id: 2, text: 'Привет! Отлично, спасибо!', sender: 'me', time: '14:32' },
  ]);

  const filteredUsers = mockUsers.filter(user => {
    const matchesAge = ageFilter === 'all' || 
      (ageFilter === '18-25' && user.age >= 18 && user.age <= 25) ||
      (ageFilter === '26-35' && user.age >= 26 && user.age <= 35) ||
      (ageFilter === '36+' && user.age >= 36);
    
    const matchesCity = cityFilter === 'all' || user.city === cityFilter;
    
    const matchesSearch = searchQuery === '' || 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.interests.some(interest => interest.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesAge && matchesCity && matchesSearch;
  });

  const cities = Array.from(new Set(mockUsers.map(u => u.city)));

  const handleSendMessage = () => {
    if (messageText.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: messageText,
        sender: 'me',
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setMessageText('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <header className="glass-effect border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center">
              <Icon name="Heart" className="text-white" size={20} />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              GOSALTUSKALOVE.RU
            </h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#profiles" className="text-sm font-medium hover:text-primary transition-colors">Анкеты</a>
            <a href="#search" className="text-sm font-medium hover:text-primary transition-colors">Поиск</a>
            <a href="#faq" className="text-sm font-medium hover:text-primary transition-colors">FAQ</a>
            <a href="#contacts" className="text-sm font-medium hover:text-primary transition-colors">Контакты</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline"
              onClick={() => navigate('/profile')}
              className="hover-scale"
            >
              <Icon name="User" size={16} className="mr-2" />
              Профиль
            </Button>
            <Button className="gradient-bg text-white border-0 hover:opacity-90">
              <Icon name="LogIn" size={16} className="mr-2" />
              Войти
            </Button>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 py-16 text-center">
        <div className="animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
            Найди свою половинку
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Тысячи людей уже нашли свою любовь на нашей платформе. Присоединяйся к ним прямо сейчас!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="gradient-bg text-white border-0 hover:opacity-90 hover-scale">
              <Icon name="UserPlus" size={20} className="mr-2" />
              Создать анкету
            </Button>
            <Button size="lg" variant="outline" className="hover-scale">
              <Icon name="Search" size={20} className="mr-2" />
              Найти пару
            </Button>
          </div>
        </div>
      </section>

      <section id="search" className="container mx-auto px-4 py-12">
        <Card className="glass-effect border-2 animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Icon name="SlidersHorizontal" size={24} />
              Поиск по параметрам
            </CardTitle>
            <CardDescription>Настройте фильтры для поиска идеальной пары</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Поиск по имени/интересам</label>
                <Input 
                  placeholder="Введите имя или интерес..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white/50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Возраст</label>
                <Select value={ageFilter} onValueChange={setAgeFilter}>
                  <SelectTrigger className="bg-white/50">
                    <SelectValue placeholder="Выберите возраст" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Любой возраст</SelectItem>
                    <SelectItem value="18-25">18-25 лет</SelectItem>
                    <SelectItem value="26-35">26-35 лет</SelectItem>
                    <SelectItem value="36+">36+ лет</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Город</label>
                <Select value={cityFilter} onValueChange={setCityFilter}>
                  <SelectTrigger className="bg-white/50">
                    <SelectValue placeholder="Выберите город" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все города</SelectItem>
                    {cities.map(city => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section id="profiles" className="container mx-auto px-4 py-12">
        <h3 className="text-3xl font-bold mb-8 text-center">
          Анкеты пользователей
          <span className="ml-3 text-primary">({filteredUsers.length})</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user, index) => (
            <Card 
              key={user.id} 
              className="overflow-hidden hover-scale cursor-pointer glass-effect border-2 hover:border-primary transition-all animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedUser(user)}
            >
              <div className="aspect-square overflow-hidden">
                <img 
                  src={user.photo} 
                  alt={user.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{user.name}, {user.age}</CardTitle>
                  <Badge variant="secondary" className="gradient-bg text-white border-0">
                    <Icon name="MapPin" size={12} className="mr-1" />
                    {user.city}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {user.interests.map((interest, i) => (
                    <Badge key={i} variant="outline" className="bg-white/50">
                      {interest}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{user.bio}</p>
              </CardContent>
              <CardFooter className="gap-2">
                <Button 
                  className="flex-1 gradient-bg text-white border-0 hover:opacity-90"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentChat(user);
                    setChatOpen(true);
                  }}
                >
                  <Icon name="MessageCircle" size={16} className="mr-2" />
                  Написать
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="hover:bg-red-50 hover:text-red-500 hover:border-red-500 transition-colors"
                >
                  <Icon name="Heart" size={20} />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section id="faq" className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-3xl font-bold mb-8 text-center">Вопросы и ответы</h3>
          <Accordion type="single" collapsible className="space-y-4">
            {faqData.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="glass-effect border-2 rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold hover:text-primary">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section id="contacts" className="container mx-auto px-4 py-16 mb-16">
        <div className="max-w-2xl mx-auto">
          <Card className="glass-effect border-2">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl mb-2">Свяжитесь с нами</CardTitle>
              <CardDescription>Мы всегда рады помочь вам найти свою любовь</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-white/50 rounded-lg hover-scale">
                <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center">
                  <Icon name="Mail" className="text-white" size={20} />
                </div>
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-muted-foreground">support@gosaltuskalove.ru</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white/50 rounded-lg hover-scale">
                <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center">
                  <Icon name="Phone" className="text-white" size={20} />
                </div>
                <div>
                  <p className="font-semibold">Телефон</p>
                  <p className="text-muted-foreground">+7 (800) 555-35-35</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white/50 rounded-lg hover-scale">
                <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center">
                  <Icon name="MessageSquare" className="text-white" size={20} />
                </div>
                <div>
                  <p className="font-semibold">Telegram</p>
                  <p className="text-muted-foreground">@gosaltuskalove_support</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="glass-effect border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 GOSALTUSKALOVE.RU. Все права защищены.</p>
          <p className="mt-2">Создано с ❤️ для тех, кто ищет настоящую любовь</p>
        </div>
      </footer>

      <Dialog open={selectedUser !== null} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent className="max-w-2xl">
          {selectedUser && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">Анкета пользователя</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={selectedUser.photo} alt={selectedUser.name} />
                    <AvatarFallback>{selectedUser.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold">{selectedUser.name}, {selectedUser.age}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <Icon name="MapPin" size={16} className="text-muted-foreground" />
                      <span className="text-muted-foreground">{selectedUser.city}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">О себе</h4>
                  <p className="text-muted-foreground">{selectedUser.bio}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Интересы</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedUser.interests.map((interest, i) => (
                      <Badge key={i} className="gradient-bg text-white border-0">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button 
                    className="flex-1 gradient-bg text-white border-0 hover:opacity-90"
                    onClick={() => {
                      setCurrentChat(selectedUser);
                      setChatOpen(true);
                      setSelectedUser(null);
                    }}
                  >
                    <Icon name="MessageCircle" size={16} className="mr-2" />
                    Написать сообщение
                  </Button>
                  <Button variant="outline" size="icon" className="hover:bg-red-50 hover:text-red-500">
                    <Icon name="Heart" size={20} />
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={chatOpen} onOpenChange={setChatOpen}>
        <DialogContent className="max-w-2xl h-[600px] flex flex-col p-0">
          {currentChat && (
            <>
              <DialogHeader className="px-6 py-4 border-b">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={currentChat.photo} alt={currentChat.name} />
                    <AvatarFallback>{currentChat.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <DialogTitle>{currentChat.name}</DialogTitle>
                    <p className="text-sm text-muted-foreground">Онлайн</p>
                  </div>
                </div>
              </DialogHeader>
              <ScrollArea className="flex-1 px-6 py-4">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                          msg.sender === 'me'
                            ? 'gradient-bg text-white'
                            : 'bg-muted text-foreground'
                        }`}
                      >
                        <p>{msg.text}</p>
                        <p className={`text-xs mt-1 ${msg.sender === 'me' ? 'text-white/70' : 'text-muted-foreground'}`}>
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="px-6 py-4 border-t">
                <div className="flex gap-2">
                  <Input
                    placeholder="Напишите сообщение..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleSendMessage}
                    className="gradient-bg text-white border-0 hover:opacity-90"
                  >
                    <Icon name="Send" size={20} />
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}