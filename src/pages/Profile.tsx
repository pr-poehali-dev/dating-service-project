import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

interface UserProfile {
  name: string;
  age: number;
  city: string;
  bio: string;
  interests: string[];
  photo: string;
  photos: string[];
  email: string;
  phone: string;
  gender: string;
  lookingFor: string;
  height: string;
  education: string;
  profession: string;
}

export default function Profile() {
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Александр',
    age: 28,
    city: 'Москва',
    bio: 'Люблю активный отдых, путешествия и знакомства с интересными людьми. Занимаюсь спортом, увлекаюсь фотографией и кулинарией. Ищу человека для серьезных отношений и совместных приключений.',
    interests: ['Путешествия', 'Спорт', 'Фотография', 'Кулинария', 'Музыка'],
    photo: 'https://cdn.poehali.dev/projects/15177953-07e8-48f6-a284-638501c25de6/files/c00b0834-55f1-4204-8966-7c330e6602b2.jpg',
    photos: [
      'https://cdn.poehali.dev/projects/15177953-07e8-48f6-a284-638501c25de6/files/c00b0834-55f1-4204-8966-7c330e6602b2.jpg',
      'https://cdn.poehali.dev/projects/15177953-07e8-48f6-a284-638501c25de6/files/56b09b6b-d284-4093-8edb-247b980f2407.jpg',
      'https://cdn.poehali.dev/projects/15177953-07e8-48f6-a284-638501c25de6/files/a662fb19-b0ca-425f-a97b-4e44090ff87b.jpg',
    ],
    email: 'alex@example.com',
    phone: '+7 (999) 123-45-67',
    gender: 'Мужской',
    lookingFor: 'Серьезные отношения',
    height: '180 см',
    education: 'Высшее',
    profession: 'IT-специалист'
  });

  const [editedProfile, setEditedProfile] = useState(profile);
  const [newInterest, setNewInterest] = useState('');
  const [privacySettings, setPrivacySettings] = useState({
    showPhone: false,
    showEmail: true,
    showOnline: true,
    showLastSeen: false
  });

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditMode(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditMode(false);
  };

  const addInterest = () => {
    if (newInterest.trim() && !editedProfile.interests.includes(newInterest.trim())) {
      setEditedProfile({
        ...editedProfile,
        interests: [...editedProfile.interests, newInterest.trim()]
      });
      setNewInterest('');
    }
  };

  const removeInterest = (interest: string) => {
    setEditedProfile({
      ...editedProfile,
      interests: editedProfile.interests.filter(i => i !== interest)
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <header className="glass-effect border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/')}
              className="hover:bg-white/50"
            >
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center">
                <Icon name="Heart" className="text-white" size={20} />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                GOSALTUSKALOVE.RU
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="hover:bg-white/50">
              <Icon name="Bell" size={20} />
            </Button>
            <Button variant="outline" size="icon" className="hover:bg-white/50">
              <Icon name="Settings" size={20} />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <Card className="glass-effect border-2 mb-6 animate-fade-in">
            <CardHeader className="relative">
              <div className="absolute top-6 right-6">
                {!isEditMode ? (
                  <Button 
                    onClick={() => setIsEditMode(true)}
                    className="gradient-bg text-white border-0 hover:opacity-90"
                  >
                    <Icon name="Edit" size={16} className="mr-2" />
                    Редактировать профиль
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button 
                      onClick={handleSave}
                      className="gradient-bg text-white border-0 hover:opacity-90"
                    >
                      <Icon name="Check" size={16} className="mr-2" />
                      Сохранить
                    </Button>
                    <Button 
                      onClick={handleCancel}
                      variant="outline"
                    >
                      <Icon name="X" size={16} className="mr-2" />
                      Отмена
                    </Button>
                  </div>
                )}
              </div>
              <div className="flex items-start gap-6">
                <div className="relative">
                  <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                    <AvatarImage src={profile.photo} alt={profile.name} />
                    <AvatarFallback className="text-2xl">{profile.name[0]}</AvatarFallback>
                  </Avatar>
                  {isEditMode && (
                    <Button 
                      size="icon"
                      className="absolute -bottom-2 -right-2 rounded-full gradient-bg text-white border-0 hover:opacity-90 w-10 h-10"
                    >
                      <Icon name="Camera" size={16} />
                    </Button>
                  )}
                </div>
                <div className="flex-1">
                  {!isEditMode ? (
                    <>
                      <CardTitle className="text-3xl mb-2">{profile.name}, {profile.age}</CardTitle>
                      <div className="flex items-center gap-4 text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Icon name="MapPin" size={16} />
                          <span>{profile.city}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Icon name="Briefcase" size={16} />
                          <span>{profile.profession}</span>
                        </div>
                        <Badge className="gradient-bg text-white border-0">
                          <Icon name="Circle" size={8} className="mr-1 fill-current" />
                          Онлайн
                        </Badge>
                      </div>
                      <p className="text-muted-foreground">{profile.bio}</p>
                    </>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Имя</Label>
                          <Input 
                            value={editedProfile.name}
                            onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                            className="bg-white/50"
                          />
                        </div>
                        <div>
                          <Label>Возраст</Label>
                          <Input 
                            type="number"
                            value={editedProfile.age}
                            onChange={(e) => setEditedProfile({...editedProfile, age: parseInt(e.target.value)})}
                            className="bg-white/50"
                          />
                        </div>
                      </div>
                      <div>
                        <Label>О себе</Label>
                        <Textarea 
                          value={editedProfile.bio}
                          onChange={(e) => setEditedProfile({...editedProfile, bio: e.target.value})}
                          className="bg-white/50 min-h-[100px]"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
          </Card>

          <Tabs defaultValue="info" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 glass-effect border-2">
              <TabsTrigger value="info">
                <Icon name="User" size={16} className="mr-2" />
                Информация
              </TabsTrigger>
              <TabsTrigger value="photos">
                <Icon name="Images" size={16} className="mr-2" />
                Фото
              </TabsTrigger>
              <TabsTrigger value="interests">
                <Icon name="Heart" size={16} className="mr-2" />
                Интересы
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Icon name="Settings" size={16} className="mr-2" />
                Настройки
              </TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="animate-fade-in">
              <Card className="glass-effect border-2">
                <CardHeader>
                  <CardTitle>Личная информация</CardTitle>
                  <CardDescription>Основные данные вашего профиля</CardDescription>
                </CardHeader>
                <CardContent>
                  {!isEditMode ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label className="text-muted-foreground">Город</Label>
                          <p className="text-lg font-medium">{profile.city}</p>
                        </div>
                        <div>
                          <Label className="text-muted-foreground">Пол</Label>
                          <p className="text-lg font-medium">{profile.gender}</p>
                        </div>
                        <div>
                          <Label className="text-muted-foreground">Рост</Label>
                          <p className="text-lg font-medium">{profile.height}</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <Label className="text-muted-foreground">Ищу</Label>
                          <p className="text-lg font-medium">{profile.lookingFor}</p>
                        </div>
                        <div>
                          <Label className="text-muted-foreground">Образование</Label>
                          <p className="text-lg font-medium">{profile.education}</p>
                        </div>
                        <div>
                          <Label className="text-muted-foreground">Профессия</Label>
                          <p className="text-lg font-medium">{profile.profession}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label>Город</Label>
                          <Input 
                            value={editedProfile.city}
                            onChange={(e) => setEditedProfile({...editedProfile, city: e.target.value})}
                            className="bg-white/50"
                          />
                        </div>
                        <div>
                          <Label>Пол</Label>
                          <Select 
                            value={editedProfile.gender}
                            onValueChange={(value) => setEditedProfile({...editedProfile, gender: value})}
                          >
                            <SelectTrigger className="bg-white/50">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Мужской">Мужской</SelectItem>
                              <SelectItem value="Женский">Женский</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Рост</Label>
                          <Input 
                            value={editedProfile.height}
                            onChange={(e) => setEditedProfile({...editedProfile, height: e.target.value})}
                            className="bg-white/50"
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <Label>Ищу</Label>
                          <Select 
                            value={editedProfile.lookingFor}
                            onValueChange={(value) => setEditedProfile({...editedProfile, lookingFor: value})}
                          >
                            <SelectTrigger className="bg-white/50">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Серьезные отношения">Серьезные отношения</SelectItem>
                              <SelectItem value="Дружба">Дружба</SelectItem>
                              <SelectItem value="Общение">Общение</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Образование</Label>
                          <Input 
                            value={editedProfile.education}
                            onChange={(e) => setEditedProfile({...editedProfile, education: e.target.value})}
                            className="bg-white/50"
                          />
                        </div>
                        <div>
                          <Label>Профессия</Label>
                          <Input 
                            value={editedProfile.profession}
                            onChange={(e) => setEditedProfile({...editedProfile, profession: e.target.value})}
                            className="bg-white/50"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="photos" className="animate-fade-in">
              <Card className="glass-effect border-2">
                <CardHeader>
                  <CardTitle>Галерея фотографий</CardTitle>
                  <CardDescription>Добавьте до 6 фотографий в свой профиль</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {profile.photos.map((photo, index) => (
                      <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
                        <img 
                          src={photo} 
                          alt={`Фото ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                        {isEditMode && (
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <Button size="icon" variant="destructive">
                              <Icon name="Trash2" size={16} />
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                    {isEditMode && profile.photos.length < 6 && (
                      <button className="aspect-square rounded-lg border-2 border-dashed border-muted-foreground/30 hover:border-primary transition-colors flex items-center justify-center group bg-white/30 hover-scale">
                        <div className="text-center">
                          <Icon name="Plus" size={32} className="mx-auto text-muted-foreground group-hover:text-primary transition-colors" />
                          <p className="text-sm text-muted-foreground mt-2">Добавить фото</p>
                        </div>
                      </button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="interests" className="animate-fade-in">
              <Card className="glass-effect border-2">
                <CardHeader>
                  <CardTitle>Мои интересы</CardTitle>
                  <CardDescription>Расскажите о том, что вам нравится</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-wrap gap-2">
                    {(isEditMode ? editedProfile.interests : profile.interests).map((interest, index) => (
                      <Badge 
                        key={index} 
                        className="gradient-bg text-white border-0 text-base py-2 px-4"
                      >
                        {interest}
                        {isEditMode && (
                          <button 
                            onClick={() => removeInterest(interest)}
                            className="ml-2 hover:text-red-200 transition-colors"
                          >
                            <Icon name="X" size={14} />
                          </button>
                        )}
                      </Badge>
                    ))}
                  </div>
                  {isEditMode && (
                    <div className="flex gap-2">
                      <Input 
                        placeholder="Добавить новый интерес..."
                        value={newInterest}
                        onChange={(e) => setNewInterest(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addInterest()}
                        className="bg-white/50"
                      />
                      <Button 
                        onClick={addInterest}
                        className="gradient-bg text-white border-0 hover:opacity-90"
                      >
                        <Icon name="Plus" size={16} className="mr-2" />
                        Добавить
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="animate-fade-in">
              <div className="space-y-6">
                <Card className="glass-effect border-2">
                  <CardHeader>
                    <CardTitle>Приватность</CardTitle>
                    <CardDescription>Управление видимостью личной информации</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-semibold">Показывать телефон</Label>
                        <p className="text-sm text-muted-foreground">Другие пользователи смогут видеть ваш номер</p>
                      </div>
                      <Switch 
                        checked={privacySettings.showPhone}
                        onCheckedChange={(checked) => setPrivacySettings({...privacySettings, showPhone: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-semibold">Показывать email</Label>
                        <p className="text-sm text-muted-foreground">Другие пользователи смогут видеть вашу почту</p>
                      </div>
                      <Switch 
                        checked={privacySettings.showEmail}
                        onCheckedChange={(checked) => setPrivacySettings({...privacySettings, showEmail: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-semibold">Показывать статус онлайн</Label>
                        <p className="text-sm text-muted-foreground">Другие увидят, когда вы в сети</p>
                      </div>
                      <Switch 
                        checked={privacySettings.showOnline}
                        onCheckedChange={(checked) => setPrivacySettings({...privacySettings, showOnline: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-semibold">Показывать время последнего визита</Label>
                        <p className="text-sm text-muted-foreground">Отображение времени последней активности</p>
                      </div>
                      <Switch 
                        checked={privacySettings.showLastSeen}
                        onCheckedChange={(checked) => setPrivacySettings({...privacySettings, showLastSeen: checked})}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-effect border-2">
                  <CardHeader>
                    <CardTitle>Контактная информация</CardTitle>
                    <CardDescription>Способы связи с вами</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Email</Label>
                      <Input 
                        type="email"
                        value={profile.email}
                        disabled
                        className="bg-white/30"
                      />
                    </div>
                    <div>
                      <Label>Телефон</Label>
                      <Input 
                        type="tel"
                        value={profile.phone}
                        disabled
                        className="bg-white/30"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
